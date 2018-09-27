<template>
    <div ref="calendar" id="available_calendar"></div>
</template>

<script>
    import defaultsDeep from 'lodash.defaultsdeep'
    import moment from 'moment';
    import 'fullcalendar'

    export default {
        name:"scheduling-calendar",
        props: {
            events: {
                default() {
                    return []
                },
            },

            eventSources: {
                default() {
                    return []
                },
            },
            eventOverlap: {
                default() {
                    return true
                }
            },
            editable: {
                default() {
                    return true
                },
            },

            selectable: {
                default() {
                    return false
                },
            },

            selectHelper: {
                default() {
                    return true
                },
            },
            calendarType: {
                type: String,
                default() {
                    return "";
                }
            },
            header: {
                default() {
                    return {
                        left:   'prev,next today',
                        center: 'title',
                        right:  'month,agendaWeek,agendaDay'
                    }
                },
            },

            defaultView: {
                default() {
                    return 'agendaWeek'
                },
            },

            sync: {
                default() {
                    return false
                }
            },

            config: {
                type: Object,
                default() {
                    return {}
                },
            },
        },

        computed: {
            defaultConfig() {
                const self = this
                return {
                    header: this.header,
                    defaultDate: moment().format("YYYY-MM-DD"),
                    defaultView: this.defaultView,
                    editable: this.editable,
                    navLinks:true,
                    selectable: this.selectable,
                    selectHelper: this.selectHelper,
                    aspectRatio: 2,
                    timeFormat: 'HH:mm',
                    maxTime: '24:00:00',
                    events: this.events,
                    eventSources: this.eventSources,
                    eventOverlap(...args) {
                        return self.eventOverlap;
                    },
                    selectOverlap(...args) {
                        if(self.calendarType=="tutor") {
                            return false;
                        } else {
                            var event = args[0];
                            return event.rendering=="background";
                        }
                    },
                    eventRender(...args) {
                        if (this.sync) {
                            self.events = self.$el.fullCalendar('clientEvents')
                        }
                        
                        self.$emit('event-render', ...args)
                    },

                    eventDestroy(event) {
                        if (this.sync) {
                            self.events = self.$el.fullCalendar('clientEvents')
                        }
                    },

                    eventClick(...args) {
                        self.$emit('event-selected', ...args)
                    },
                    eventDragStart(...args) {
                        self.$emit('event-dragstart', ...args)
                    },
                    eventDrop(...args) {
                        self.$emit('event-drop', ...args)
                    },
                    eventResizeStart(...args) {
                        self.$emit('event-resizestart', ...args)
                    },
                    eventResize(...args) {
                        self.$emit('event-resize', ...args)
                    },
                    dayClick(...args){
                        self.$emit('day-click', ...args)
                    },
                    viewRender(...args) {
                        self.$emit('date-changes',...args);
                    },
                    select(start, end, jsEvent) {
                        self.$emit('event-created', {
                            start,
                            end,
                            allDay: !start.hasTime() && !end.hasTime(),
                        })
                    },
                }
            },
        },

        mounted() {
            this.$nextTick(function(){
                const self = this;
                this.$on('remove-event', (event) => {
                    if(event && event.hasOwnProperty('id')){
                        $(self.$el).fullCalendar('removeEvents', event.id);
                    }else{
                        $(self.$el).fullCalendar('removeEvents', event);
                    }
                })

                this.$on('rerender-events', () => {
                    $(self.$el).fullCalendar('rerenderEvents')
                })

                this.$on('refetch-events', () => {
                    $(self.$el).fullCalendar('refetchEvents')
                })

                this.$on('render-event', (event) => {
                    $(self.$el).fullCalendar('renderEvent', event)
                })

                this.$on('reload-events', () => {
                    $(self.$el).fullCalendar('removeEvents')
                    $(self.$el).fullCalendar('addEventSource', self.events)
                })

                this.$on('rebuild-sources', () => {
                    $(self.$el).fullCalendar('removeEvents')
                    self.eventSources.map(event => {
                        $(self.$el).fullCalendar('addEventSource', event)
                    })
                })

                $(this.$el).fullCalendar(defaultsDeep(this.config, this.defaultConfig))
            });
        },
        methods: {
            fireMethod(...options) {
                $(this.$el).fullCalendar(...options)
            },
        },

        watch: {
            events: {
                deep: true,
                handler(val) {
                    $("#available_calendar").fullCalendar('removeEvents')
                    $("#available_calendar").fullCalendar('addEventSource', val)
                },
            },
            eventSources: {
                deep: true,
                handler(val) {
                    this.$emit('rebuild-sources')
                },
            },
            type: function(){
            }
        },

        beforeDestroy() {
            this.$off('remove-event')
            this.$off('rerender-events')
            this.$off('refetch-events')
            this.$off('render-event')
            this.$off('reload-events')
            this.$off('date-changes')
            this.$off('rebuild-sources')
        },
    }
</script>
<style>
    @import '~fullcalendar/dist/fullcalendar.css';
</style>