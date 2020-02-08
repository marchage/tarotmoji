<template>
  <StackLayout>
    <Label row="0" text="My Past-Present-Future Reading" class="title med" />
    <GridLayout rows="auto,1,*" columns="*"  class="card">
      <GridLayout row="0" rows="*" columns="*,*,*">
        <!-- doesn't render reliably with v-for (likely icw Tabs) -->
        <Label col="0" :class="tabClss(0)" text="PAST" @tap="onSelect0"></Label>
        <Label col="1" :class="tabClss(1)" text="PRESENT" @tap="onSelect1"></Label>
        <Label col="2" :class="tabClss(2)" text="FUTURE" @tap="onSelect2"></Label>
      </GridLayout>
      <StackLayout row="1" backgroundColor="#8089A8" style="opacity: .2"></StackLayout>
      <StackLayout row="2">
        <Tabs :selectedIndex="selectedIdx" @selectedIndexChanged="onSelectedIdxChanged">
          <TabContentItem>
            <!-- doesn't render without a closing tag -->
            <!-- doesn't render reliably with v-for -->
            <CardDetails
              :name="positions[0].name"
              :major="positions[0].major"
              :meaning="positions[0].meaning"
              :emoji="positions[0].emoji"
              :emoji1="positions[0].emoji1"
              :emoji2="positions[0].emoji2"
              :icon="positions[0].icon"
              :reversed="positions[0].reversed"
            ></CardDetails>
          </TabContentItem>
          <TabContentItem>
            <CardDetails
              :name="positions[1].name"
              :major="positions[1].major"
              :meaning="positions[1].meaning"
              :emoji="positions[1].emoji"
              :emoji1="positions[1].emoji1"
              :emoji2="positions[1].emoji2"
              :icon="positions[1].icon"
              :reversed="positions[1].reversed"
            ></CardDetails>
          </TabContentItem>
          <TabContentItem>
            <CardDetails
              :name="positions[2].name"
              :major="positions[2].major"
              :meaning="positions[2].meaning"
              :emoji="positions[2].emoji"
              :emoji1="positions[2].emoji1"
              :emoji2="positions[2].emoji2"
              :icon="positions[2].icon"
              :reversed="positions[2].reversed"
            ></CardDetails>
          </TabContentItem>
        </Tabs>
      </StackLayout>
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
    // ugly!!! tried a lot of options, for many hours. Settled on something practical like this
    onSelect0() {
      this.selectedIdx = 0;
    },
    onSelect1() {
      this.selectedIdx = 1;
    },
    onSelect2() {
      this.selectedIdx = 2;
    },
    onSelectedIdxChanged(args) {
      const prevSelectedIdx = this.selectedIdx;
      this.selectedIdx =
        typeof args === "object" &&
        typeof args.newIndex === "number" &&
        !isNaN(args.newIndex)
          ? args.newIndex
          : this.selectedIdx;
      if (prevSelectedIdx !== this.selectedIdx) {
        if (this.shouldLoadNewCards()) this.loadNewCards();
        else this.$store.dispatch("Readings/set", { views: this.views - 1 });
      }
    },
    shouldLoadNewCards() {
      return (
        !this.timestamp ||
        (this.timestamp && dayjs(this.timestamp).isBefore(dayjs())) || // timestamp is too old
        !this.views ||
        (this.views && this.views <= 0) || // current reading is viewed too often,
        this.positions.reduce((sum, position) => !~position.id || sum === 0, 0) // current reading (partially) contains default cards.
      );
    },
    loadNewCards() {
      this.$store.dispatch("Readings/set", {
        timestamp: dayjs()
          .endOf(this.rndEndOf())
          .format(),
        type: this.type,
        views: Math.round(Math.random() * 6) + 5,
        positions: this.positions.map(pos =>
          Object.assign({}, pos, this.getCardInstance(this.rndEndOf()))
        )
      });
    }
  },
  created() {
    // this.$store.dispatch("Readings/reset");
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

