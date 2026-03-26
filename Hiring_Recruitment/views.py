from django.shortcuts import redirect

def index(request):
    return redirect('http://localhost:8081/')

def AdminLogin(request):
    return render(request, 'AdminLogin.html', {})


def UserLogin(request):
    return render(request, 'UserLogin.html', {})


def UserRegister(request):
    form = UserRegistrationForm()
    return render(request, 'UserRegistrations.html', {'form': form})


