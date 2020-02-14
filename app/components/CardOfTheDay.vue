<template>
  <GridLayout rows="auto,auto" verticalAlignment="top">
    <Label row="0" text="Card of the Day" class="title med" />
    <!-- had to specify all props iso passing in the containing object @TODO -->
    <CardDetails 
      row="1"
      :name="cotd.name"
      :major="cotd.major"
      :meaning="cotd.meaning"
      :emoji="cotd.emoji"
      :emoji1="cotd.emoji1"
      :emoji2="cotd.emoji2"
      :icon="cotd.icon"
      :reversed="cotd.reversed"
    />
  </GridLayout>
</template>

<script>
import { createNamespacedHelpers } from "../vuex";
import dayjs from "../dayjs";

import Tarot from "../mixins/tarot";
import CardDetails from "./CardDetails";

const { mapState } = createNamespacedHelpers("Cotd");

// had to specify all props before hand for them to be picked up
// by the subcomponent
export default {
  mixins: [Tarot],
  components: {
    CardDetails
  },
  computed: {
    ...mapState({
      cotd: state => ({
        id: state.id,
        timestamp: state.timestamp,
        major: state.major,
        name: state.name,
        meaning: state.meaning,
        emoji: state.emoji,
        emoji1: state.emoji1,
        emoji2: state.emoji2,
        icon: state.icon,
        reversed: state.reversed
      })
    })
  },
  created() {
    // this.$store.dispatch('Cotd/reset')
    this.$store.dispatch("Cotd/load");
    if (
      (this.cotd.timestamp && dayjs(this.cotd.timestamp).isBefore(dayjs())) ||
      !this.cotd.id ||
      this.cotd.id === -1
    ) {
      const newCotd = this.getCardInstance("hour"); // initiate @TODO set time to day
      this.$store.dispatch("Cotd/set", newCotd); // set store
    }
  }
};
</script>

<style>
.meaning {
  font-size: 16;
  color: #131636;
  text-align: center;
  margin: 0 20;
}

.status {
  color: #323340;
  opacity: 0.5;
  font-size: 14;
}
</style>
