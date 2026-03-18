from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.uploadedfile import UploadedFile

from .utils.parser import extract_text_from_file, is_resume_heuristic
from .utils.matcher import calculate_match
from .db import (
    save_analysis, 
    get_all_jobs, 
    get_job, 
    create_job, 
    update_job, 
    delete_job
)

class AnalyzeResumeView(APIView):
    def post(self, request, *args, **kwargs):
        resume_file: UploadedFile = request.FILES.get('resume')
        job_description = request.data.get('job_description')

        if not resume_file or not job_description:
            return Response(
                {"error": "Please provide both 'resume' file and 'job_description' text."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 1. Extract text
        resume_text = extract_text_from_file(resume_file, resume_file.name)
        if not resume_text:
            return Response(
                {"error": "Failed to extract text from the provided resume file. Ensure it is a valid PDF or DOCX."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 1.5 Verify it's a resume
        if not is_resume_heuristic(resume_text):
            return Response(
                {"error": "The uploaded document does not appear to be a valid resume. Please upload a legitimate resume file."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 2. Analyze
        match_results = calculate_match(resume_text, job_description)

        # 3. Save to History (Fire and forget, ignoring errors for demo)
        save_analysis(resume_file.name, job_description, match_results)

        # 4. Return results
        return Response(match_results, status=status.HTTP_200_OK)


class JobListCreateView(APIView):
    def get(self, request):
        jobs = get_all_jobs()
        return Response(jobs, status=status.HTTP_200_OK)

    def post(self, request):
        title = request.data.get('title')
        description = request.data.get('description')
        
        if not title or not description:
            return Response({"error": "Title and description are required"}, status=status.HTTP_400_BAD_REQUEST)
            
        job_id = create_job(title, description)
        if job_id:
            return Response({"id": job_id, "title": title, "description": description}, status=status.HTTP_201_CREATED)
        return Response({"error": "Failed to create job"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class JobDetailView(APIView):
    def get(self, request, job_id):
        job = get_job(job_id)
        if job:
            return Response(job, status=status.HTTP_200_OK)
        return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, job_id):
        title = request.data.get('title')
        description = request.data.get('description')
        
        if not title or not description:
            return Response({"error": "Title and description are required"}, status=status.HTTP_400_BAD_REQUEST)
            
        success = update_job(job_id, title, description)
        if success:
            return Response({"message": "Job updated successfully"}, status=status.HTTP_200_OK)
        return Response({"error": "Job not found or update failed"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, job_id):
        success = delete_job(job_id)
        if success:
            return Response({"message": "Job deleted successfully"}, status=status.HTTP_200_OK)
        return Response({"error": "Job not found or deletion failed"}, status=status.HTTP_400_BAD_REQUEST)
