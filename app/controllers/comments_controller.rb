class CommentsController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    #Create a comment associated with a post
    @comment = @post.comments.build(comment_params)
    @comment.user_id = current_user.id
    if @comment.save
      ActionCable.server.broadcast 'message_channel', 
      content: @comment, user: @comment.user, 
      date: @comment.created_at.to_s(:datetime_jp), 
      id: @comment.id,post: @comment.post, 
      image_url: url_for(@comment.user.profile.header_image)
    end
  end

  def destroy
    @post = Post.find(params[:post_id])
    @comment = Comment.find(params[:id])
    if @comment.destroy
      ActionCable.server.broadcast 'delete_channel', id: @comment.id
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :post_id, :user_id, :header_image).merge(user_id: current_user.id)
  end
end