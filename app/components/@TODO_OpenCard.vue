<template>
  <!-- READING -->
  <GridLayout row="2" rows="2*,*,3*,3*" class="card">
    <!-- name -->
    <Label row="0" textWrap="true" class="card-title" :text="name" />
    <!-- reversed -->
    <StackLayout
      v-if="reversed"
      row="1"
      style="margin:5"
      verticalAlignment="top"
      horizontalAlignment="center"
      orientation="horizontal"
    >
      <Label class="fa status" text.decode="&#xf021;" />
      <Label class="status" text=" REVERSED" />
    </StackLayout>
    <!-- major: emoji -->
    <Image row="2" v-if="major" :class="icon" :src="emoji" />
    <!-- !major: emoji1 & emoji2 -->
    <StackLayout
      row="2"
      rows="*"
      columns="*,*"
      v-if="!major"
      horizontalAlignment="center"
      orientation="horizontal"
    >
      <Image style="margin:5" v-if="!major" :class="icon" :src="emoji1" />
      <Image style="margin:5" v-if="!major" :class="icon" :src="emoji2" />
    </StackLayout>
    <!-- meaning -->
    <Label row="3" class="meaning" textWrap="true" :text="meaning" />
  </GridLayout>

  <!-- COTD -->
  <GridLayout row="1" rows="2*,*,3*,3*" class="card">
    <!-- name -->
    <Label row="0" textWrap="true" class="card-title" :text="name" />
    <!-- reversed -->
    <StackLayout
      v-if="reversed"
      row="1"
      style="margin:5"
      verticalAlignment="top"
      horizontalAlignment="center"
      orientation="horizontal"
    >
      <Label class="fa status" text.decode="&#xf021;" />
      <Label class="status" text=" REVERSED" />
    </StackLayout>
    <!-- major: emoji -->
    <Image row="2" v-if="major" :class="icon" :src="emoji" />
    <!-- !major: emoji1 & emoji2 -->
    <StackLayout
      row="2"
      rows="*"
      columns="*,*"
      v-if="!major"
      horizontalAlignment="center"
      orientation="horizontal"
    >
      <Image style="margin:5" v-if="!major" :class="icon" :src="emoji1" />
      <Image style="margin:5" v-if="!major" :class="icon" :src="emoji2" />
    </StackLayout>
    <!-- meaning -->
    <Label row="3" class="meaning" textWrap="true" :text="meaning" />
  </GridLayout>

  <!-- LIST_VIEW -->
  <StackLayout row="1" ref="meaningContainer" class="list-item list-item-meaning">
    <Image col="0" :src="'~/assets/emoji/' + value + '.png' " class="emoji_window" />
    <Label col="1" :text="name" class="card-title" style="text-align: center;padding-bottom: 24;" />
    <GridLayout columns="20,*" rows="*,*">
      <Image
        col="0"
        row="0"
        class="arrow"
        verticalAlignment="top"
        src="~/assets/arrow_up.png"
        style="margin-top: 5; margin-right: 10"
      />
      <Label
        col="1"
        row="0"
        verticalAlignment="top"
        :text="meaning_up"
        textWrap="true"
        style="margin-bottom:25; font-size: 16;"
      />
      <Image
        col="0"
        row="1"
        class="arrow2"
        verticalAlignment="top"
        src="~/assets/arrow_down.png"
        style="margin-top: 5; margin-right: 10"
      />
      <Label
        col="1"
        row="1"
        verticalAlignment="top"
        :text="meaning_rev"
        textWrap="true"
        style="font-size: 16"
      />
    </GridLayout>
  </StackLayout>

  <!-- slot: cotd.reversed ->  -->
  <StackLayout
    v-if="reversed"
    row="1"
    style="margin:5"
    verticalAlignment="top"
    horizontalAlignment="center"
    orientation="horizontal"
  >
    <Label class="fa status" text.decode="&#xf021;" />
    <Label class="status" text=" REVERSED" />
  </StackLayout>

  <StackLayout>
    <Label text="remove me!"></Label>
  </StackLayout>
</template>

<script>
export default {};
</script>

<style>
</style>
