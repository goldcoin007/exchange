<?php


namespace App\Admin\Actions\User;

use Dcat\Admin\Admin;
use Dcat\Admin\Grid\RowAction;
use Illuminate\Http\Request;
use Dcat\Admin\Actions\Action;
use Dcat\Admin\Actions\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Dcat\Admin\Traits\HasPermissions;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Str;

class AddUser extends Action
{
  /**
   * @return string
   */
  protected $title = '添加用户';

  public function render()
  {
    $id = get_order_sn('su');

    // 模态窗
    $this->modal($id);

    return <<<HTML
<span class="grid-expand" data-toggle="modal" data-target="#{$id}">
   <a class="btn btn-sm btn-outline-primary" href="javascript:void(0)">{$this->title}</a>
</span>
HTML;
  }

  protected function modal($id)
  {
    // 工具表单
    $form = new \App\Admin\Forms\User\AddUser();

    // 通过 Admin::html 方法设置模态窗HTML
    Admin::html(
      <<<HTML
<div class="modal fade" id="{$id}">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">{$this->title}</h4>
         <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
        {$form->render()}
      </div>
    </div>
  </div>
</div>
HTML
    );
  }

  /**
   * Handle the action request.
   *
   * @param Request $request
   *
   * @return Response
   */
  public function handle(Request $request)
  {
    // dump($this->getKey());

    //        return $this->response()->success('Processed successfully.')->redirect('/');
  }

  /**
   * @return string|array|void
   */
  public function confirm()
  {
    // return ['Confirm?', 'contents'];
  }

  /**
   * @param Model|Authenticatable|HasPermissions|null $user
   *
   * @return bool
   */
  protected function authorize($user): bool
  {
    return true;
  }

  /**
   * @return array
   */
  protected function parameters()
  {
    return [];
  }
}
