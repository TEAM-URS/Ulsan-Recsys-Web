from django.shortcuts import render, redirect
from django.http  import HttpResponse
from .models import User
from django.contrib import auth
import re
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect

# Create your views here.

def signup(request):
  if request.method == 'POST':
    
    username = request.POST['username']
    email = request.POST['email']
    password = request.POST['password1']
    
    email_regex    = '[a-zA-Z0-9.-_+]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+'
    password_regex = '^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$'
    
    if not re.match(email_regex, email):
      return render(request, 'accounts/signup.html', {'error':'이메일을 다시 입력해주세요.'})
    
    if not re.match(password_regex, password):
      return render(request, 'accounts/signup.html', {'error':'비밀번호를 다시 입력해주세요.'})
    
    if password == request.POST['password2']:
      user = User.objects.create_user(username=username, email=email, password=password)
      auth.login(request, user)
      return render(request, 'ursapp/index.html')
  return render(request, 'accounts/signup.html')

@csrf_exempt
def login(request):
  if request.method == 'POST':
    username = request.POST['username']
    password = request.POST['password']
    user = auth.authenticate(request, username=username, password=password)
    if user is not None:
      auth.login(request, user)
      redirect_url = 'http://localhost:3000?username=' + username
      return HttpResponseRedirect(redirect_url)
    else:
      return render(request, 'accounts/login.html', {'error':'아이디, 비밀번호를 확인해주세요.'})
  else:
    return render(request, 'accounts/login.html')
  
def logout(request):
  if request.method == 'GET':
    auth.logout(request)
    return redirect('index')
  return render(request, 'ursapp/index.html')