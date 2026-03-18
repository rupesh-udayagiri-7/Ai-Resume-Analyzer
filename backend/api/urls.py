from django.urls import path
from .views import AnalyzeResumeView, JobListCreateView, JobDetailView

urlpatterns = [
    path('analyze/', AnalyzeResumeView.as_view(), name='analyze_resume'),
    path('jobs/', JobListCreateView.as_view(), name='job-list-create'),
    path('jobs/<str:job_id>/', JobDetailView.as_view(), name='job-detail'),
]
