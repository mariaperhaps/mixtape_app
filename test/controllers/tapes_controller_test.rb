require 'test_helper'

class TapesControllerTest < ActionController::TestCase
  setup do
    @tape = tapes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:tapes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create tape" do
    assert_difference('Tape.count') do
      post :create, tape: { message: @tape.message, name: @tape.name, reciever: @tape.reciever, user_id_id: @tape.user_id_id }
    end

    assert_redirected_to tape_path(assigns(:tape))
  end

  test "should show tape" do
    get :show, id: @tape
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @tape
    assert_response :success
  end

  test "should update tape" do
    patch :update, id: @tape, tape: { message: @tape.message, name: @tape.name, reciever: @tape.reciever, user_id_id: @tape.user_id_id }
    assert_redirected_to tape_path(assigns(:tape))
  end

  test "should destroy tape" do
    assert_difference('Tape.count', -1) do
      delete :destroy, id: @tape
    end

    assert_redirected_to tapes_path
  end
end
