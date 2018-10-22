<template>
    <section class="il-section il-section--big-image">
      <div class="il-big--img">
          <div class="il-section--diagonal il-color-background--body"></div>
            <div class="il-banner--painel">
              <div class="il-container--wrapper">
                <h2 class="il-section--title il-t2">{{title}}.</h2>
                <p class="il-section--description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ex a nostrum voluptates porro ullam ducimus voluptate in repellat. Eveniet illum omnis ex incidunt repellat nam, repellendus deleniti, doloremque fuga expedita pariatur? Laborum, eaque veniam?</p>
              </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'BigImage',
    data(){
      return {
        title: 'Beleza e Harmonia'
      }
    }
}
</script>
