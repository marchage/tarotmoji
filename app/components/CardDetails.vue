<template>
  <!-- CardDetails -->
  <GridLayout rows="2*,*,3*,3*" class="card">
    <!-- 0: name -->
    <Label row="0" textWrap="true" class="card-title" :text="name" />
    <!-- 1: reversed: flexbox not stacked, as that doesn't align correctly on iOS -->
    <FlexboxLayout flexDirection="row" justifyContent="center" row="1" style="margin:5">
      <Label v-if="reversed" class="fa status" text.decode="&#xf021;" />
      <Label v-if="reversed" class="status" text=" REVERSED" />
    </FlexboxLayout>
    <!-- 2A: emoji -->
    <Image row="2" v-if="major" :class="icon" :src="emoji" />
    <!-- 2B: emoji1/2 -->
    <FlexboxLayout
      flexDirection="row"
      justifyContent="center"
      row="2"
      style="margin:5"
      v-if="!major"
    >
      <Image style="margin:5" :class="icon" :src="emoji1" />
      <Image style="margin:5" :class="icon" :src="emoji2" />
    </FlexboxLayout>
    <!-- 3: meaning -->
    <Label row="3" class="meaning" textWrap="true" :text="meaning" />
  </GridLayout>
</template>

<script>
export default {
  name: "CardDetails",
  props: [
    "name",
    "reversed",
    "major",
    "icon",
    "emoji",
    "emoji1",
    "emoji2",
    "meaning"
  ]
};
</script>

<style scoped>
</style>
