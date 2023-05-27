import json
import requests
from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import render, redirect, get_object_or_404, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.urls import reverse

from .models import UserInfo, RestInfo, AttrInfo, ReviewAttrInfo, ReviewRestInfo
import tensorflow as tf
from .recsys.filltering import recom_cbf, recom_hybrid
from .recsys.util import get_unvisted_item, get_items, load_data, culc_sim


def i_id2i_name(k, kind):
    i_list = []
    if kind == 'rest':
        for i_id in k:
            item = RestInfo.objects.get(p_id=i_id)
            i_list.append(item)
        
    else:
        for i_id in k:
            item = AttrInfo.objects.get(p_id=i_id)
            i_list.append(item)
    return i_list



# Create your views here.

def index(request):
    return render(request, 'ursapp/index.html')

@login_required
def recsys_r(request):
    try: 
        user_id = str(request.user)
        print(user_id)
        user = UserInfo.objects.get(u_name=user_id)
        print(user.u_name)
        i_list = False
        if request.POST:
            u_id = int(user.u_id)
            load_model = tf.keras.models.load_model('ursapp/recsys/model/MLP.h5')
            data_df = load_data('rest')
            sim = culc_sim('rest')
            top_n = recom_hybrid(load_model, int(u_id), data_df, 10, sim)
            top_n = list(top_n.p_id)
            
            i_list = i_id2i_name(top_n, kind='rest')
        else:
            u_id = False
        return render(request, 'ursapp/recsys_r.html', {'i_list': i_list, 'type': 'rest'})
    except:
        print('except')
        return redirect('questionnaire_r')
   
@login_required
def recsys_a(request):
    try: 
        user_id = str(request.user)
        print(user_id)
        user = UserInfo.objects.get(u_name=user_id)
            
        i_list = False
        if request.POST:
            u_id = int(user.u_id)
            load_model = tf.keras.models.load_model('ursapp/recsys/model/attraction_MLP.h5')
            data_df = load_data('attr')
            sim = culc_sim('attr')
            top_n = recom_hybrid(load_model, int(u_id), data_df, 10, sim)
            top_n = list(top_n.p_id)
            
            i_list = i_id2i_name(top_n, kind='attr')
        else:
            u_id = False

        return render(request, 'ursapp/recsys_a.html', {'i_list': i_list, 'type': 'attr'})
    except:
        print('execpt')
        return redirect('questionnaire_a')
 
   
@login_required
def quesionnaire_r(request): ## 사전설문지기반으로 컨텐츠기반필터링 추천
    try:
        sorted_object_rating = RestInfo.objects.order_by('-rating')[:20]
        return render(request, 'ursapp/questionnaire_r.html', {'i_list': sorted_object_rating})
    except:
        HttpResponse(400)

@login_required
def questionnaire_a(request): ## 사전설문지기반으로 컨텐츠기반필터링 추천
    try:
        sorted_object_rating = AttrInfo.objects.order_by('-rating')[:20]
        return render(request, 'ursapp/questionnaire_a.html', {'i_list': sorted_object_rating})
    except:
        HttpResponse(400)


@login_required
def cbf(request): ## 사전설문지기반으로 컨텐츠기반필터링 추천
    kind = request.POST['type']
    print(type(kind))
    print(kind)
    cbf_list = []
    try:
        if request.POST:
            items = request.POST.getlist('item')
            for i in items:
                if kind == 'rest':
                    item = RestInfo.objects.get(p_name=str(i))
                    print(item) 
                    sim = culc_sim(kind)
                    cbf_list.extend(recom_cbf(int(item.p_id), sim, flag=1))
                    print(cbf_list)
                else:
                    item = AttrInfo.objects.get(p_name=str(i))
                    
                    sim = culc_sim(kind)
                    cbf_list.extend(recom_cbf(int(item.p_id), sim, flag=1))
    except:
        HttpResponse(400)
    print(cbf_list)
    cbf_pids = [i[0] for i in cbf_list]
    if kind == 'rest':
        i_list = i_id2i_name(cbf_pids, kind)
    else:
        i_list = i_id2i_name(cbf_pids, kind)
    return render(request, 'ursapp/cbf.html', {'i_list': i_list, 'type': kind})
    
@login_required
def kakaomap(request):
    kind = request.POST['type']
    item_list = []
    try:
        if request.POST:
            items = request.POST.getlist('item')
            for i in items:
                if kind == 'rest':
                    item = RestInfo.objects.get(p_name=i)
                else:
                    item = AttrInfo.objects.get(p_name=i)
                    
                item_list.append({
                    'title' : item.p_name,
                    'address': item.address
                })
            item_list_json = json.dumps(item_list)
        return render(request, 'ursapp/kakaomap.html', {'items': item_list_json})
    except:
        HttpResponse(400)

@login_required
def review(request):
    if request.method == 'POST':
        u_id = request.user.id
        title = request.POST['title']
        rating = request.POST['reviewStar']
        review = request.POST['review']
        
        if title is not None:
            try:
                rest = RestInfo.objects.get(p_name=title)
                attr = None
            except:
                attr = AttrInfo.objects.get(p_name=title)
                rest = None
            if rest is not None:
                ReviewRestInfo.objects.create(u_id=u_id, p_id=rest.p_id, rating=rating, review=review)
                
            else:
                ReviewAttrInfo.objects.create(u_id=u_id, p_id=attr.p_id, rating=rating, review=review)