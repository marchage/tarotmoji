<template>
  <StackLayout>
    <Label text="My Reading" class="title med" />
    <GridLayout rows="auto,1,*" columns="*" class="card">
      <GridLayout row="0" rows="*" :columns="Array(positions.length).fill('*').join()">
        <!-- might not render without closing tag, i.e. <Label /> might not work -->
        <Label
          v-for="(p, i) in positions"
          :key="p.id"
          :col="i"
          :class="tabClss(i)"
          :text="p.title"
          @tap="onTap(i)"
        ></Label>
      </GridLayout>
      <StackLayout row="1" backgroundColor="#8089A8" style="opacity: .2"></StackLayout>
      <RadListView
        ref="listview"
        for="p in positions"
        orientation="horizontal"
        pullToRefresh="true"
        :pullToRefreshStyle="{
            indicatorBackgroundColor: '#E3E9F8', 
            indicatorColor: '#142237'
          }"
        layout="staggered"
        gridSpanCount="1"
        @scrolled="onScrolled"
        @pullToRefreshInitiated="onPullToRefreshInitiated"
        horizontalAlignment="center"
        row="2"
        itemWidth="100%"
      >
        <v-template>
          <CardDetails ios:width="100%" :key="p.id" v-bind="p"></CardDetails>
        </v-template>
      </RadListView>
    </GridLayout>
  </StackLayout>
</template>

<script>
import { createNamespacedHelpers } from "../vuex";
import dayjs from "../dayjs";
import Vue from "nativescript-vue";

import Tarot from "../mixins/tarot";
import CardDetails from "./CardDetails";
import {
  ListViewItemSnapMode,
  ListViewScrollDirection
} from "nativescript-ui-listview";
// import { ObservableArray } from "tns-core-modules/data/observable-array";

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
    onTap(tabIdx) {
      this.selectedIdx = tabIdx;
      this.$refs.listview.scrollToIndex(
        tabIdx,
        true,
        ListViewItemSnapMode.auto
      );
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
    },
    onPullToRefreshInitiated({ object }) {
      // console.log("Pulling...");
      this.loadNewCards();
      // object.notifyPullToRefreshFinished();
      // in order to avoid race conditions (only on iOS),
      // in which the UI may not be completely updated here
      // we use this.$nextTick call
      this.$nextTick().then(function() {
        object.notifyPullToRefreshFinished();
      });
    },
    onScrolled({ scrollOffset }) {
      // console.log(`scrollOffset ${scrollOffset}`);
    },
    onItemTap({ item }) {
      console.log(`Tapped on ${item.name}`);
    },
    onNavigationButtonTap() {
      Frame.topmost().goBack();
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

