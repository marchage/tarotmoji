<template>
  <GridLayout rows="auto,auto" verticalAlignment="top">
    <Label row="0" text="Card of the Day" class="title med" />
    <CardDetails
      :name="cardOfTheDay.name"
      :major="cardOfTheDay.major"
      :meaning="cardOfTheDay.meaning"
      :emoji="cardOfTheDay.emoji"
      :emoji1="cardOfTheDay.emoji1"
      :emoji2="cardOfTheDay.emoji2"
      :icon="cardOfTheDay.icon"
      :reversed="cardOfTheDay.reversed"
    />
  </GridLayout>
</template>

<script>
import { createNamespacedHelpers } from "../vuex";
import dayjs from "../dayjs";

import Tarot from "../mixins/tarot";
import CardDetails from "./CardDetails";

const { mapState } = createNamespacedHelpers("Cotd");

// had to specify all options out before hand for them to be picked up
// by the subcomponent
export default {
  mixins: [Tarot],
  components: {
    CardDetails
  },
  data() {
    return {
      cardOfTheDay: { 
        major: false,
        name: '',
        meaning: '',
        emoji: '',
        emoji1: '',
        emoji2: '',
        icon: '',
        reversed: false
       }
    };
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
  watch: {
    cotd: function(val, oldVal) {
      this.cardOfTheDay = val;
    }
  },
  created() {
    // this.$store.dispatch('Cotd/reset')
    this.$store.dispatch("Cotd/load");
    if (
      (this.cotd.timestamp && dayjs(this.cotd.timestamp).isBefore(dayjs())) ||
      !this.cotd.id ||
      this.cotd.id === -1
    ) {
      // this.loadCardThisProps('hour');  // load
      const cotd = this.getCardInstance("hour"); // initiate
      this.$store.dispatch("Cotd/set", cotd); // set store
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
