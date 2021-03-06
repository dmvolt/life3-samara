<?php

defined('SYSPATH') or die('No direct script access.');

class Controller_Appointments extends Controller_Template {

    public function action_review() {
        $id = $this->request->param('id');
        $content = View::factory($this->template_directory . 'review')
				->bind('edit_interface', $edit_interface)
                ->bind('article', $article);
        $appointments_obj = new Model_Appointments();
        $article = $appointments_obj->get_content($id);
		
		$edit_interface = Liteedit::get_interface($article['id'], 'appointments');
        $this->page_title = $article['descriptions'][$this->lang_id]['title'];
        $this->template->content = $content;
    }
	
    public function action_appointments() {
        $appointments_obj = new Model_Appointments();
		$seo_obj = new Model_Seo();
		
		$appointments = array();
		
		$total = $appointments_obj->get_total();
		$result = Pagination::start($total);
		$pagination = Pagination::navigation($result['page'], $total, $result['total_page'], $result['num']);
		$content = $appointments_obj->get_all(0, $result['start'], $result['num'], 0);
	
		if($content){
			foreach($content as $item){
				$childs = $appointments_obj->get_childs($item['id']);
				$appointments[] = array(
					'id' => $item['id'],
					'parent_id' => $item['parent_id'],
					'date' => $item['date'],
					'descriptions' => $item['descriptions'],
					'answer' => $childs,
				);
			}
		}

		$parameters = '';
        $i = 0;
        
        if($result['page']){
            $parameters .= ($i) ? '&page='.$result['page'] : '?page='.$result['page'];
            $i++;
        }
		
		$this->page_title = 'Вопрос-ответ';
		$modulinfo = Modulinfo::get_block('appointments');
		if(!empty($modulinfo)){
			/****************************** SEO ******************************/	
			$seo = $seo_obj->get_seo_to_content($modulinfo[0]['id'], 'modulinfo');
			
			if($seo[$this->lang_id]['title'] != ''){
				$this->page_title = $seo[$this->lang_id]['title'];
			}
			
			$this->meta_description = $seo[$this->lang_id]['meta_d'];
			$this->meta_keywords = $seo[$this->lang_id]['meta_k'];
			/****************************** /SEO *****************************/
		}
		
		$content = View::factory($this->template_directory . 'appointments')
					->bind('pagination', $pagination)
					->bind('modulinfo', $modulinfo)
					->bind('appointments', $appointments);
        $this->template->content = $content;
    }
}
// Appointments