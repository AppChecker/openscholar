<div id="node-<?php print $node->nid; ?>" class="<?php print $node_classes; ?>">
  <div class="node-inner">
    <div class="os-links">
      <?php print $vsite_admin_links; ?>
    </div>
    <?php if (!$page): ?>
      <h3 class="title">
        <a href="<?php print $node_url; ?>" title="<?php print $title ?>"><?php print $title; ?></a>
      </h3>
    <?php endif; ?>
    <?php if ($unpublished): ?>
      <p class="unpublished"><?php print t('Unpublished'); ?></p>
    <?php endif; ?>
    <?php if ($submitted): ?>
        <p class="submitted"><?php print $submitted; ?></p>
      <?php endif; ?>
     <?php if ($page): ?>
     <?php if ($terms): ?>
       <div class="terms terms-inline"><?php print t(' in ') . $terms; ?></div>
     <?php endif; ?>
     <?php endif; ?>
    <div class="content">
      <?php print $content; ?>
    </div>
    <?php if (!$page): ?>
      <?php if ($terms): ?>
      <div class="terms terms-inline"><?php print t(' in ') . $terms; ?></div>
      <?php endif; ?>
    <?php endif; ?>
    <div class="links links-inline">
      <?php print $links;?>
    </div>
  </div> <!-- /node-inner -->
</div> <!-- /node -->