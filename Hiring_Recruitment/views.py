from django.shortcuts import redirect, render
from django.http import HttpResponse

def index(request):
    return HttpResponse('AI Based Multimodal Resume Ranking APIS are running successfully on ' + request.get_host())

def AdminLogin(request):
    return render(request, 'AdminLogin.html', {})


def UserLogin(request):
    return render(request, 'UserLogin.html', {})


def UserRegister(request):
    form = UserRegistrationForm()
    return render(request, 'UserRegistrations.html', {'form': form})


