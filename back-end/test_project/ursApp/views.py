from django.shortcuts import render
import tensorflow as tf

from .recsys.filltering import recom_cbf, recom_hybrid
from .recsys.util import get_unvisted_item, get_items, load_data, culc_sim

# Create your views here.

def index(request):
    return render(request, 'ursapp/index.html')

def test(request):
    top_n = False
    if 'u_id' in request.POST:
        u_id = request.POST['u_id']
        load_model = tf.keras.models.load_model('ursapp/recsys/model/MLP.h5')
        data_df = load_data()
        sim = culc_sim()
        top_n = recom_hybrid(load_model, int(u_id), data_df, 10, sim)
        top_n = list(top_n.p_id)
    else:
        u_id = False

    return render(request, 'ursapp/test.html', {'top_n': top_n})