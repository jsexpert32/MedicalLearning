<template>
    <div>
        <h2>Set Book Time</h2>
        <calendar :events="events" :calendarType="calendarType" editable="true" selectable="true" @date-changes="catchDateChange"
            @event-render="eventRender" @event-selected="eventSelected" @event-created="eventCreated" @event-resize="eventResized"
            @event-drop="eventDroped"></calendar>
        <modal v-model="dialog_show" effect="fade" :backdrop='false'>
            <!-- custom header -->
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">
                    <i class="fa fa-calendar"> </i> Book Trial
                </h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <label class="col-sm-2">Time:</label>
                    <label class="col-sm-8">{{getSelectedEventTime()}}</label>
                </div>
            </div>
            <!-- custom buttons -->
            <div slot="modal-footer" class="modal-footer">
                <button type="button" @click="bookTrial()" class="btn btn-default">Book Trial</button>
                <button type="button" @click="dialog_show=false" class="btn btn-default" >Close</button>
            </div>

        </modal>
    </div>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';
import Storage from '../../../../services/Storage'
import {modal} from 'vue-strap'
import { isEventOverlap } from '../../../../utility/calendarUtility.js'


export default {
    name:"prebook-trial",
    beforeCreate() {
      
    },
    created() {
       
    },
    mounted() {
        if(this.$el) {
            this.getTrialTimes();
        }
    },
    components: {
        'modal':modal
    },
    methods: {
        addCreatedEvent:function(payload) {
            var event = {};
            event.title = "";
            event.start = payload.start;
            event.end = payload.end;
            event.event_id = payload._id;
            event.constraint = "availableTrial";
            event.color = "#03a9f4";
            //set color when type is not normal  (when type is normal , set default color)
            this.events.push(event);
        },
        getTrialTimes() {
            var payload = {};
            this.$store.dispatch("getTrialTimeForStudent",payload).then(data=>{
                this.initEvents(data.data,"trial");
            }).catch(() => {

            });
        },
        getSelectedEventTime:function() {
           if(this.start_time && this.end_time) {
                var start_datestring = this.start_time.format("YYYY-MM-DD hh:mm");
                var end_datesting = this.end_time.format("YYYY-MM-DD hh:mm");
                return start_datestring + "-" + end_datesting;
            }
            return "";
        },
        initEvents: function (event_array , type) {
            for(var i=0;i<event_array.length;i++) {
                var item  = event_array[i];
                var event = {};
                event.start = item.start;
                event.end = item.end;
                if(type=="trial") {
                    event.color =  "#00bcd4";
                    event.id = "availableTrial";
                    event.rendering = "background";
                }else {
                    event.constraint = "availableTrial";
                    event.color = "#03a9f4";
                }
                this.events.push(event);
            }
        },
        bookTrial:function() {
            var payload = {};
            payload.start = this.start_time.valueOf();
            payload.end = this.end_time.valueOf();
            this.$store.dispatch("bookTrialTime",payload).then(data=>{
                this.addCreatedEvent(data.data);
                this.dialog_show = false;
            }).catch(() => {
                this.dialog_show = false;
            });
        },
        eventCreated:function(...eventdate) {
            let start = eventdate[0].start;
            let end  = eventdate[0].end;
            this.start_time = moment(start);
            this.end_time = moment(end);
            var isOverlapped = isEventOverlap(this.events,this.start_time.valueOf(),this.end_time.valueOf());
            if(!isOverlapped) {
                this.dialog_show = true;
            }else {
                alert("Can not book trial on outside of available background!");
            }
        },
        catchDateChange: function(...args) {

        },
        eventRender: function(...args) {

        },
        eventSelected:function(event) {
           
        },
        eventResized:function(...args) {
           
        },
        eventDroped:function(...args) {
            
        }
    },
    data() {
        return {
            events: [],
            dialog_show: false,
            start_time:null,
            end_time:null,
            event_action_type:"create",
            selected_event: null,
            calendarType: "student"
        }
  }
}
</script>

<style>

</style>