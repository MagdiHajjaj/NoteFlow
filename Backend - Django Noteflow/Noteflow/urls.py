from django.contrib import admin
from django.urls import path, include
from api.views import CreatedUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreatedUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),  # Main API routes
]

# endpoints:
# GET_ALL_NOTES_and_CREATE_NEW_NOTE = "127.0.0.1:8008/notes/"
# GET_SPECIFIC_NOTE = "127.0.0.1:8008/notes/note-slug"
