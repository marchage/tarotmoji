<template>
  <!-- CardDetails -->
  <GridLayout rows="2*,*,3*,3*" class="card">
    <!-- name -->
    <Label row="0" textWrap="true" class="card-title" :text="name" />
    <!-- reversed -->
    <StackLayout
      row="1"
      style="margin:5"
      verticalAlignment="top"
      horizontalAlignment="center"
      orientation="horizontal"
    >
      <Label v-if="reversed" class="fa status" text.decode="&#xf021;" />
      <Label v-if="reversed" class="status" text=" REVERSED" />
    </StackLayout>
    <!-- emoji -->
    <Image row="2" v-if="major" :class="icon" :src="emoji" />
    <!-- emoji1/2 -->
    <StackLayout
      row="2"
      rows="*"
      columns="*,*"
      v-if="!major"
      horizontalAlignment="center"
      orientation="horizontal"
    >
      <Image style="margin:5" :class="icon" :src="emoji1" />
      <Image style="margin:5" :class="icon" :src="emoji2" />
    </StackLayout>
    <!-- meaning -->
    <Label row="3" class="meaning" textWrap="true" :text="meaning" />
  </GridLayout>
</template>

<script>
export default {
  name: 'CardDetails',
  props: [
    'name',
    'reversed',
    'major',
    'icon',
    'emoji',
    'emoji1',
    'emoji2',
    'meaning'
  ]
};
</script>

<style>
</style>
