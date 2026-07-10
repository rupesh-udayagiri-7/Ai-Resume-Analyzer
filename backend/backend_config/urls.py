from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse, HttpResponse

def home_view(request):
    return JsonResponse({
        "status": "online",
        "message": "AI Resume Analyzer Backend API is running.",
        "endpoints": {
            "jobs": "/api/jobs/",
            "analyze": "/api/analyze/"
        }
    })

def favicon_view(request):
    return HttpResponse(status=204)

urlpatterns = [
    path('', home_view),
    path('favicon.ico', favicon_view),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
