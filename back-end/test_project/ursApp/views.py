import json
from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .models import UserInfo, RestInfo, AttrInfo
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
def recsys(request):

    try: 
        user_id = str(request.user)
        user = UserInfo.objects.get(u_name=user_id)
        if user_id == user.u_name:
            print("same")
        else:
            print("eeeror")
            
        i_list = False
        if request.POST:
            u_id = int(user.u_id)
            load_model = tf.keras.models.load_model('ursapp/recsys/model/MLP.h5')
            data_df = load_data()
            sim = culc_sim()
            top_n = recom_hybrid(load_model, int(u_id), data_df, 10, sim)
            top_n = list(top_n.p_id)
            
            i_list = i_id2i_name(top_n, kind='rest')
        else:
            u_id = False

        return render(request, 'ursapp/recsys.html', {'i_list': i_list})
    except KeyError:
        return HttpResponse(status=400)  
       
@login_required
def kakaomap(request):
    item_list = []
    try:
        if request.POST:
            items = request.POST.getlist('item')
            for i in items:
                item = RestInfo.objects.get(p_name=i)
                item_list.append({
                    'address': item.address
                })
            item_list_json = json.dumps(item_list)
        return render(request, 'ursapp/kakaomap.html', {'items': item_list_json})
    
    except KeyError:
        return HttpResponse(status=400)