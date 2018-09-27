<template>
    <div>
        <h2>Set Availability</h2>
        <tabs>
            <tab header="Specific">
                <calendar :events="events" editable="true" selectable="true" :calendarType="calendarType"
                          :eventOverlap="false" @date-changes="catchDateChange"
                          @event-render="eventRender" @event-selected="eventSelected" @event-created="eventCreated"
                          @event-resize="eventResized"
                          @event-drop="eventDroped" @event-dragstart="eventDragStarted"
                          @event-resizestart="eventResizeStarted"></calendar>

            </tab>
            <tab header="Regular">
                <h3>Regular Weekly Hours</h3>
                <p>
                    Use this schedule if you have similar hours week-to-week. Enter window(s) of time (9:00am-12:00pm, 1:00pm-5:00pm).
                </p>
            </tab>
        </tabs>

        <modal v-model="dialog_show" effect="fade" :backdrop='false'>
            <!-- custom header -->
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">
                    <i class="fa fa-calendar"> </i> {{this.dialog_title}}
                </h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <label class="col-sm-2">Time:</label>
                    <label class="col-sm-8">{{getSelectedEventTime()}}</label>
                </div>
                <div class="row">
                    <label class="col-sm-2">Type:</label>
                    <select :disabled="event_action_type=='delete'" class="col-sm-4 schedule-type" type="text"
                            v-model="type">
                        <option v-for="item in scheduletypes" v-bind:value="item">{{item}}</option>
                    </select>
                </div>
            </div>
            <!-- custom buttons -->
            <div slot="modal-footer" class="modal-footer">
                <button type="button" v-if="event_action_type=='create'" @click="saveCreatedEvent()"
                        class="btn btn-default">Set Available Time
                </button>
                <button type="button" v-if="event_action_type=='delete'" @click="deleteEvent()" class="btn btn-default">
                    Delete
                </button>
                <button type="button" v-if="event_action_type=='update'" @click="updateEvent()" class="btn btn-default">
                    Update Time
                </button>
                <button type="button" class="btn btn-default" @click="cancelEvent()">Close</button>
            </div>

        </modal>

    </div>
</template>

<script>

    import Vue from 'vue';
    import moment from 'moment';
    import {modal, tabs, tab} from 'vue-strap'
    import Storage from '../../../../services/Storage'
    import {deleteEventFromCalendar, cancelEventFromCalendar} from '../../../../utility/calendarUtility.js'

    export default {
        beforeCreate() {

        },
        created() {

        },
        mounted() {
            this.$nextTick(function () {
                var payload = {};
                payload.current_month = moment().format("YYYY-MM").toString();
                this.getEvents(payload);
            });
        },
        components: {
            'modal': modal,
            'tabs': tabs,
            'tab': tab
        },
        methods: {
            addCreatedEvent: function (payload) {
                var event = {};
                event.title = "";
                event.start = payload.start;
                event.end = payload.end;
                event.available_type = payload.type;
                event.event_id = payload.availabilityId;
                //set color when type is not normal  (when type is normal , set default color)
                this.setColorByType(event);
                this.events.push(event);
            },
            getEvents(payload) {
                this.$store.dispatch("getAvailableTime", payload).then(data => {
                    var event_array = data.data;
                    if (event_array) {
                        this.initEvents(event_array);
                    }
                }).catch(() => {

                });
            },
            setColorByType(event) {
                switch (event.available_type) {
                    case "schedule":
                        event.color = "#1de669";
                        break;
                    case "trial":
                        event.color = "#00bcd4";
                        break;
                    default:
                        break;
                }
                return event;
            },
            initEvents(event_array) {
                for (var i = 0; i < event_array.length; i++) {
                    var item = event_array[i];
                    var event = {};
                    event.start = item.start;
                    event.end = item.end;
                    event.available_type = item.type;
                    event.event_id = item.availabilityId;
                    this.setColorByType(event);
                    this.events.push(event);
                }
            },
            eventCreated: function (...eventdate) {
                let start = eventdate[0].start;
                let end = eventdate[0].end;
                this.start_time = moment(start);
                this.end_time = moment(end);
                this.event_action_type = "create";
                this.dialog_title = "Set Available Time";
                this.dialog_show = true;
            },
            eventSelected: function (event) {
                this.event_action_type = "delete";
                this.dialog_title = "Delete Time";
                this.processEventChange(event);
            },
            eventResized: function (...args) {
                var event = args[0];
                this.event_action_type = "update";
                this.dialog_title = "Update Time";
                this.processEventChange(event);
            },
            eventDroped: function (...args) {
                var event = args[0];
                this.event_action_type = "update";
                this.dialog_title = "Update Time";
                this.processEventChange(event);
            },
            eventDragStarted: function (...args) {
                let event = args[0];
                this.prevstart_time = moment(event.start);
                this.prevend_time = moment(event.end);
            },
            eventResizeStarted: function (...args) {
                let event = args[0];
                this.prevstart_time = moment(event.start);
                this.prevend_time = moment(event.end);
            },
            processEventChange: function (event) {
                this.selected_event = event;
                this.type = event.available_type;
                this.start_time = moment(event.start);
                this.end_time = moment(event.end);
                if (this.selected_event.hasOwnProperty("type")) {
                    this.type = this.selected_event["type"];
                }
                this.dialog_show = true;
            },
            eventRender: function (...event) {
            },
            getSelectedEventTime: function () {
                if (this.start_time && this.end_time) {
                    var start_datestring = this.start_time.format("YYYY-MM-DD hh:mm");
                    var end_datesting = this.end_time.format("YYYY-MM-DD hh:mm");
                    return start_datestring + "-" + end_datesting;
                }
                return "";
            },
            catchDateChange: function (...event) {
                var m = event[0];
            },
            saveCreatedEvent: function () {
                if (this.start_time && this.end_time) {
                    var payload = {};
                    payload.start = this.start_time.valueOf();
                    payload.end = this.end_time.valueOf();
                    payload.type = this.type;

                    this.$store.dispatch("setAvailableTime", payload).then(data => {
                        this.addCreatedEvent(data);
                        this.dialog_show = false;
                    }).catch(() => {
                        this.dialog_show = false;
                    });
                }
            },
            deleteEvent: function () {
                if (this.selected_event) {
                    var id = this.selected_event.event_id;
                    this.$store.dispatch("deleteAvailableTime", id).then(data => {
                        var res = data.data;
                        deleteEventFromCalendar(this.events, res.availabilityId);
                        this.dialog_show = false;
                    }).catch(() => {
                        this.dialog_show = false;
                    });
                } else {
                    this.dialog_show = false;
                }
            },
            updateEvent: function () {
                if (this.selected_event) {
                    var payload = {};
                    payload.eventData = {};
                    payload.id = this.selected_event.event_id;
                    payload.eventData["start"] = moment(this.selected_event.start).valueOf();
                    payload.eventData["end"] = moment(this.selected_event.end).valueOf();
                    payload.eventData["type"] = this.type;
                    var id = this.selected_event.id;
                    this.$store.dispatch("updateAvailableTime", payload).then(data => {
                        this.dialog_show = false;
                    }).catch(() => {
                        this.dialog_show = false;
                    });
                } else {
                    this.dialog_show = false;
                }
            },
            cancelEvent: function () {
                if (this.event_action_type == "update") {
                    if (this.prevstart_time && this.prevend_time) {
                        this.start_time = this.prevstart_time;
                        this.end_time = this.prevend_time;
                        let id = this.selected_event.event_id;
                        let prevStartTimeStamp = moment(this.prevstart_time).valueOf();
                        let prevEndTimeStamp = moment(this.prevend_time).valueOf();
                        cancelEventFromCalendar(this.events, id, prevStartTimeStamp, prevEndTimeStamp);
                    }
                }
                this.dialog_show = false;
            }
        },
        data() {
            return {
                dialog_show: false,
                events: [],
                type: "trial",
                prevstart_time: null,
                prevend_time: null,
                start_time: null,
                end_time: null,
                event_action_type: "create",
                dialog_title: "Set Available Time",
                selected_event: null,
                scheduletypes: ["trial", "normal"],
                calendarType: "tutor"
            }
        }
    }
</script>

<style>
    .availability-tabs {
        margin-top: 20px;
        margin-bottom: 30px;
    }

    .available_content {
        padding-left: 25px;
        font-size: 15px;
    }

    .available_content select {
        height: 30px;
    }

    .available_content .row {
        margin-bottom: 5px;
    }

    .schedule-type {
        height: 30px;
    }
</style>