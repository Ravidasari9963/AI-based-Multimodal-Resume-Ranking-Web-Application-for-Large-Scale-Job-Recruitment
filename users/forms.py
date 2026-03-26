from django import forms
from .models import UserRegistrationModel
import re


class UserRegistrationForm(forms.ModelForm):
    name = forms.CharField(widget=forms.TextInput(
        attrs={'pattern': '[a-zA-Z]+'}), required=True, max_length=100)

    loginid = forms.CharField(widget=forms.TextInput(
        attrs={'pattern': '[a-zA-Z]+'}), required=True, max_length=100)

    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                'pattern': '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]).{8,}',
                'title': 'Password must contain uppercase, lowercase, number, special symbol and minimum 8 characters'
            }),
        required=True,
        max_length=100
    )

    mobile = forms.CharField(
        widget=forms.TextInput(attrs={'pattern': '[6-9][0-9]{9}'}),
        required=True,
        max_length=10
    )

    email = forms.CharField(
        widget=forms.TextInput(
            attrs={'pattern': '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'}),
        required=True,
        max_length=100
    )

    state = forms.CharField(
        widget=forms.TextInput(
            attrs={'autocomplete': 'off', 'pattern': '[A-Za-z ]+',
                   'title': 'Enter Characters Only'}),
        required=True,
        max_length=100
    )

    status = forms.CharField(widget=forms.HiddenInput(),
                             initial='waiting', max_length=100)

    class Meta():
        model = UserRegistrationModel
        fields = '__all__'

    # ---------------- NAME VALIDATION ----------------
    def clean_name(self):
        name = self.cleaned_data.get('name')

        if not re.match(r'^[A-Za-z ]+$', name):
            raise forms.ValidationError("Name should contain only letters.")

        return name

    # ---------------- LOGINID VALIDATION ----------------
    def clean_loginid(self):
        loginid = self.cleaned_data.get('loginid')

        if not re.match(r'^[A-Za-z]+$', loginid):
            raise forms.ValidationError("Login ID must contain only alphabets.")

        return loginid

    # ---------------- PASSWORD VALIDATION ----------------
    def clean_password(self):
        password = self.cleaned_data.get('password')

        if len(password) < 8:
            raise forms.ValidationError("Password must be at least 8 characters long.")

        if not re.search(r'[A-Z]', password):
            raise forms.ValidationError("Password must contain at least one uppercase letter.")

        if not re.search(r'[a-z]', password):
            raise forms.ValidationError("Password must contain at least one lowercase letter.")

        if not re.search(r'[0-9]', password):
            raise forms.ValidationError("Password must contain at least one number.")

        if not re.search(r'[@$!%*#?&]', password):
            raise forms.ValidationError("Password must contain at least one special character.")

        return password

    # ---------------- MOBILE VALIDATION ----------------
    def clean_mobile(self):
        mobile = self.cleaned_data.get('mobile')

        if not re.match(r'^[6-9][0-9]{9}$', mobile):
            raise forms.ValidationError("Mobile number must be exactly 10 digits and start with 6-9.")

        return mobile

    # ---------------- EMAIL VALIDATION ----------------
    def clean_email(self):
        email = self.cleaned_data.get('email')

        if not re.match(r'^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$', email):
            raise forms.ValidationError("Enter a valid email address.")

        return email

    # ---------------- STATE VALIDATION ----------------
    def clean_state(self):
        state = self.cleaned_data.get('state')

        if not re.match(r'^[A-Za-z ]+$', state):
            raise forms.ValidationError("State must contain only characters.")

        return state