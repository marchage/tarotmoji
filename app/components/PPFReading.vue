<template>
  <StackLayout>
    <Label text="My Reading" class="title med" />
    <GridLayout rows="auto,1,*" columns="*" class="card">
      <GridLayout row="0" rows="*" columns="*,*,*">
        <Label :class="tabClss(0)" text="PAST" @tap="onLabelTap(0)"></Label>
        <Label :class="tabClss(1)" text="PRESENT" @tap="onLabelTap(1)"></Label>
        <Label :class="tabClss(2)" text="FUTURE" @tap="onLabelTap(2)"></Label>
      </GridLayout>
      <StackLayout row="1" backgroundColor="#8089A8" style="opacity: .2"></StackLayout>
      <StackLayout row="2">
        <!-- spelled out (not for-looped), because Tabs cannot refresh -->
        <!-- @see https://www.nativescript.org/blog/tabs-and-bottomnavigation-nativescripts-two-new-components -->
        <Tabs
          ref="listview"
          :selectedIndex="selectedIdx"
          @selectedIndexChanged="onSelectedIdxChanged"
        >
          <TabContentItem>
            <CardDetails v-bind="positions[0]"></CardDetails>
          </TabContentItem>
          <TabContentItem>
            <CardDetails v-bind="positions[1]"></CardDetails>
          </TabContentItem>
          <TabContentItem>
            <CardDetails v-bind="positions[2]"></CardDetails>
          </TabContentItem>
        </Tabs>
      </StackLayout>
    </GridLayout>
  </StackLayout>
</template>

<script>
import { createNamespacedHelpers } from "../vuex";
import dayjs from "../dayjs";
import Vue from "nativescript-vue";

import Tarot from "../mixins/tarot";
import CardDetails from "./CardDetails";
// import { ObservableArray } from "tns-core-modules/data/observable-array";
import {
  Tabs,
  TabContentItem,
  TabStrip,
  TabStripItem,
  SelectedIndexChangedEventData
} from "@nativescript/core/ui/tabs";

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
    onLabelTap(tabIdx) {
      this.selectedIdx = tabIdx;
    },
    onSelectedIdxChanged(args) {
      const prevSelectedIdx = args.oldIndex;
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
      const newTimestamp = dayjs()
        .endOf(this.rndEndOf())
        .format();
      this.$store.dispatch("Readings/set", {
        timestamp: newTimestamp,
        type: this.type,
        views: Math.round(Math.random() * 6) + 5,
        // as to not loose the title and details props
        positions: this.positions.map(pos => ({
          title: pos.title,
          detail: pos.detail,
          ...this.getCardInstance(newTimestamp)
        }))
      });
      // this.$refs && this.$refs.listview && this.$refs.listview.refresh();
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

