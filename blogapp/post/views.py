from django.shortcuts import get_object_or_404
from rest_framework import status
from .models import Post
from .serializer import PostSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics


class PostView(APIView):
    #post create view
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            serializer.save()
            return Response(
                    serializer.data,
                    status=status.HTTP_201_CREATED,
                )
        return Response(
                {
                    "error":True,
                    "error_msg": serializer.error_messages,
                },
                status=status.HTTP_400_BAD_REQUEST
                )
Post_create_view = PostView.as_view()


class PostListAPIView(generics.ListAPIView):
    #list post in order of id
    
    queryset = Post.objects.all()
    serializer_class = PostSerializer

Post_list_view = PostListAPIView.as_view()


class PostUpdateView(APIView):
    #post update
    def put(self, request, id):
        post = get_post(id)
        if not post:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
        serializer = PostSerializer(post, data=request.data,)
    
        if serializer.is_valid(raise_exception = ValueError):
            serializer.save()
            return Response(serializer.data)
        return Response(
                {
                    "error":True,
                    "error_msg": serializer.error_messages,
                },
                status=status.HTTP_400_BAD_REQUEST
                )

    def delete(self, request, id):
        post = get_post(id)
        if not post:
            return Response(
                    {
                        "error": True,
                        "error_msg": "Post not found"
                    },
                    status=status.HTTP_404_NOT_FOUND
                )
        
        post.delete()
        return Response({"success":"post deleted"},
                status = status.HTTP_200_OK
            )
Post_update_view = PostUpdateView.as_view()
      
        
def get_post(id):
    try:
        post = Post.objects.get(id = id)
    except Post.DoesNotExist:
        return False
    return post