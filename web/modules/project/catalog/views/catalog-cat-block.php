<?php if($catalog): ?>
	<?php foreach($catalog as $value): ?>
		<a href="<?= Data::_('lang_uri') . '/catalog/' . $value['alias'] ?>"><?= $value['descriptions'][Data::_('lang_id')]['title'] ?></a><br>
	<?php endforeach; ?>
<?php endif; ?>