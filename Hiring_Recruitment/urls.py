"""
Hiring_Recruitment URL Configuration

The `urlpatterns` list routes URLs to views.
"""

from django.contrib import admin
from django.urls import path
from Hiring_Recruitment import views as mainview
from admins import views as admins
from users import views as usr

urlpatterns = [
    # API Views for Mobile App
    path("api/register/", usr.RegisterAPI, name="api_register"),
    path("api/login/", usr.LoginAPI, name="api_login"),
    path("api/admin/login/", usr.AdminLoginAPI, name="api_admin_login"),
    path("api/resume/upload/", usr.ResumeUploadAPI, name="api_resume_upload"),
    path("api/admin/users/", usr.GetRegisteredUsersAPI, name="api_get_users"),
    path("api/admin/users/manage/", usr.ManageUserStatusAPI, name="api_manage_user"),
    path("api/user/applications/", usr.GetUserApplicationsAPI, name="api_get_applications"),

    path('admin/', admin.site.urls),

    path("", mainview.index, name="index"),
    path("AdminLogin/", mainview.AdminLogin, name="AdminLogin"),
    path("UserLogin/", mainview.UserLogin, name="UserLogin"),
    path("UserRegister/", mainview.UserRegister, name="UserRegister"),

    # adminviews
    path("AdminLoginCheck/", admins.AdminLoginCheck, name="AdminLoginCheck"),
    path("AdminHome/", admins.AdminHome, name="AdminHome"),
    path('RegisterUsersView/', admins.RegisterUsersView, name='RegisterUsersView'),

    path('ActivaUsers/', admins.ActivaUsers, name='ActivaUsers'),
    path('DeleteUsers/', admins.DeleteUsers, name='DeleteUsers'),


    # User Views
    path("UserRegisterActions/", usr.UserRegisterActions, name="UserRegisterActions"),
    path("UserLoginCheck/", usr.UserLoginCheck, name="UserLoginCheck"),
    path("UserHome/", usr.UserHome, name="UserHome"),

    path('upload_resumes/', usr.index, name='upload_resumes'),
    path('application/', usr.application, name='application'),
    path('past_applications/', usr.past_applications, name='past_applications'),
    path('training/', usr.training, name='training'),

    path('send-email/', usr.send_offer_letter_to_candidate, name='send_email'),

    # Forgot Password
    path('ForgotPassword/', usr.ForgotPassword, name='ForgotPassword'),
    path('SendOTP/', usr.SendOTP, name='SendOTP'),
    path('VerifyOTP/', usr.VerifyOTP, name='VerifyOTP'),
    path('ResetPassword/', usr.ResetPassword, name='ResetPassword'),

]