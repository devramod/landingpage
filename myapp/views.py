from django.shortcuts import redirect
from django.template import loader
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.http import HttpResponse, JsonResponse
from .models import About, Service, Contact
import json

# Create your views here.
def index(request):
    template = loader.get_template('index.html')

    # About section
    about = About.objects.all()

    # Service section
    service = [
        Service.objects.filter(id=1).values(),
        Service.objects.filter(id=2).values(),
        Service.objects.filter(id=3).values(),
    ]
        
    context = {
        'about': about,
        'service': {
            'service_one': service[0],
            'service_two': service[1],
            'service_three': service[2],
        },
    }
    return HttpResponse(template.render(context, request))
    
def signup(request):
    # Sign-up
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        password2 = request.POST["password2"]

        if password == password2:
            if User.objects.filter(email=email).exists():
                messages.info(request, "Email already used")
                return redirect("")
            elif User.objects.filter(username=username).exists():
                messages.info(request, "Username already used")
                return redirect("")
            else:
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()
                data = {'username':username, 'email':email, 'password':password }
                return JsonResponse(data, safe=False)
        else:
            messages.info(request, "Password not the same")
            return redirect("")

def contact(request):
    #contact
    if request.method == "POST":
        name = request.POST["name"]
        email = request.POST["email"]
        message = request.POST["message"]

        newContact = Contact.objects.create(name=name, email=email, message=message)
        newContact.save()
        data = {'name':name, 'email':email, 'message':message}
        return JsonResponse(data, safe=False)

def account(request):
    template = loader.get_template('account.html')
    # Log-in
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect("account")
        else:
            messages.info(request, "Credential Invalid")
            return redirect("")
            
    context = {}
    return HttpResponse(template.render(context, request))

def logout(request):
    auth.logout(request)
    return redirect("/")