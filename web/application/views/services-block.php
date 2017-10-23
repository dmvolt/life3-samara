<?php if($services): ?>
	<!--<h2><span>Наши услуги</span></h2>-->
	<div class="row">
		<?php $i = 0; foreach($services as $value): ?>

			<div class="col-sm-6 col-md-4">
				<div class="info-thumbnail-link">
					<div class="thumbnail info-thumbnail background-clouds color-text">
						<div class="service">
							<div class="service-name"><h3><?= $value['descriptions'][Data::_('lang_id')]['title'] ?></h3><button onclick="location='<?= Data::_('lang_uri') ?>/services/<?= $value['alias'] ?>'" class="btn btn-service">Перейти</button></div>
						</div>
						<?php if($value['thumb']): ?>
							<img class="round" src="<?= URL::imagepath('preview3', $value['thumb'])?>" alt="">
						<?php endif; ?>
						<h4><center><?= $value['descriptions'][Data::_('lang_id')]['title'] ?></center></h4>
					</div>
				</div>
			</div>
								
			<?php  if($i<2): ?>
				<?php $i++; ?>
			<?php else: ?>
				<?php $i = 0; ?>
				</div><div class="row">
			<?php endif; ?>		
		<?php endforeach; ?>
	</div>
<?php endif; ?>