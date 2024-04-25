from django.shortcuts import get_object_or_404
from rest_framework import status
from .models import Post
from .serializer import PostSerializer, PostUpdateSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.contrib.auth.decorators import login_required
from rest_framework import authentication
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOrReadOnly


class PostView(APIView):
    #post create view
    authentication_classes = [
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    ]
    
    permission_classes = [IsAuthenticated] 
    
    def post(self, request):
        user = request.user
        request.data['created_by'] = user.id
        
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
    permission_classes = [IsAuthenticated]
    
    def put(self, request, id):
        post = get_post(id)
        if not post:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        
        if post.created_by != request.user:
            return Response(
                {"error": True, "error_msg": "You do not have permission to perform this action."},
                status=status.HTTP_403_FORBIDDEN
            )
            
        serializer = PostUpdateSerializer(post, data=request.data,)
    
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
            
        if post.created_by != request.user:
            return Response(
                {"error": True, "error_msg": "You do not have permission to perform this action."},
                status=status.HTTP_403_FORBIDDEN
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
