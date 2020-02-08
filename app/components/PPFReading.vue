<template>
  <StackLayout>
    <Label row="0" text="P-P-F Reading" class="title med" />
    <GridLayout rows="auto,1,*" columns="*" class="card">
      <GridLayout row="0" rows="*" columns="*,*,*">
        <Label
          v-for="(pos, idx) in positions"
          :key="idx"
          :col="idx"
          :class="tabClss(idx)"
          :text="'' + tabs.length >= idx - 1 ? tabs[idx] : 'OUT OF RANGE jonguh!'"
          @tap="selectedIdx = idx"
        />
      </GridLayout>
      <StackLayout row="1" backgroundColor="#8089A8" style="opacity: .2"></StackLayout>
      <Tabs row="2" selectedIndex="selectedIdx" @selectedIndexChanged="onSelectedIdxChanged">
        <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
        <!-- <TabStrip>
          <TabStripItem v-for="(position, idx) in positions" :key"position.card.id">
            <Label :class="tabClss(tab)" :text="tab"></Label>
          </TabStripItem>
        </TabStrip>-->
        <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
        <TabContentItem v-for="(pos, idx) in positions" :key="idx">
          <!-- doesn't render without a closing tag -->
          <CardDetails
            :name="pos.card.name"
            :major="pos.card.major"
            :meaning="pos.card.meaning"
            :emoji="pos.card.emoji"
            :emoji1="pos.card.emoji1"
            :emoji2="pos.card.emoji2"
            :icon="pos.card.icon"
            :reversed="pos.card.reversed"
          ></CardDetails>
        </TabContentItem>
      </Tabs>
    </GridLayout>
  </StackLayout>
</template>

<script>
import { createNamespacedHelpers } from "../vuex";
import dayjs from "../dayjs";

import Tarot from "../mixins/tarot";
import CardDetails from "./CardDetails";

const { mapState, mapGetters } = createNamespacedHelpers("Readings");

export default {
  mixins: [Tarot],
  components: {
    CardDetails
  },
  data() {
    return {
      tabs: ["Past", "Present", "Future"],
      selectedIdx: 1
    };
  },
  computed: {
    tabClss() {
      return idx => ({
        label: true,
        selected: idx === this.selectedIdx
      });
    },
    ...mapState(["timestamp", "views", "type", "positions"]),
    ...mapGetters(["past", "present", "future"])
  },
  methods: {
    onSelectedIdxChanged({ newIndex }) {
      if (this.shouldLoadNewCards()) this.loadNewCards();
      else this.$store.dispatch("Readings/set", { views: this.views - 1 });
      if (
        typeof newIndex === "number" &&
        !isNaN(newIndex) &&
        this.selectedIdx !== newIndex
      )
        this.selectedIdx = newIndex;
      else console.error("no reason to update index, new index:", newIndex);
    },
    shouldLoadNewCards() {
      // re-fill card positions if
      // @TODO could shift iso of replace all... nahh
      return (
        !this.timestamp || 
        (this.timestamp && dayjs(this.timestamp).isBefore(dayjs())) || // timestamp is too old
        !this.views ||
        (this.views && this.views < 0) || // current reading is viewed too often,
        !this.type ||
        !this.positions.map(d => d.card).reduce((s, d) => s || ~d.id, 0) // current reading (partially) contains default cards.
      );
    },
    loadNewCards() {
      this.$store.dispatch("Readings/set", {
        timestamp: dayjs()
          .endOf(this.rndEndOf())
          .format(),
        type: this.type,
        views: Math.round(Math.random() * 6) + 5,
        // spread all positions, and spread all sub-object props, so
        // copy of the position will get its card prop = instance
        positions: [...this.positions].map(d => {
          const _d = { ...d };
          _d.card = dayjs(d.card.timestamp).isBefore(dayjs()) ? d.card : this.getCardInstance();
          return _d;
        })
      });
    }
  },
  created() {
    // this.$store.dispatch('Readings/reset');
    this.$store.dispatch("Readings/load");
    if (this.shouldLoadNewCards()) this.loadNewCards();
  }
};
</script>

<style scoped>
Tabs TabStrip {
  background-color: transparent;
}

.label {
  font-family: Nunito, Nunito-Sans;
  font-size: 15;
  opacity: 0.5;
  text-align: center;
  margin: 15;
}

.selected {
  color: #5326bf;
  opacity: 1;
}
</style>

