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
      image_url: url_for(@comment.user.profile.header_image),
      notification: create_notification(@comment),
      num_not_check: @post.user.notifications.num_not_check
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
  def sum post

  end
  def create_notification comment
    return if comment.post.user_id == current_user.id
    comment.post.notifications.create! user_id: comment.post.user_id, notified_by_id: comment.user_id, notice_type: 'commented'

  end
  def comment_params
    params.require(:comment).permit(:content, :post_id, :user_id, :header_image).merge(user_id: current_user.id)
  end
end