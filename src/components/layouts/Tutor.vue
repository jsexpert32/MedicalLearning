<template>
    <div class="container-fluid">
        <div class="row">
            <div  class="col-sm-8 col-sm-offset-2 tutor-container">
                <h1 class="text-center">Apply as Tutor</h1>
                <hr>
                <form class="well" @submit.prevent="validateRegisterRequest" novalidate>
                    <div class="tutor-form">
                        <div class="form-group" :class="{'has-error': errors.has('name')}">
                            <label>Your Name <span class="required">*</span></label>
                                <input type="text"
                                       name="name"
                                       v-model="regData.name"
                                       v-validate="'required'"
                                       class="form-control"/>
                            <span v-show="errors.has('name')" class="help text-danger">{{ errors.first('name') }}</span>
                        </div>
                        <div class="form-group" :class="{'has-error': errors.has('email')}">
                            <label>Email Address <span class="required">*</span></label>
                            <input type="text"
                                   name="email"
                                   v-model="regData.email"
                                   v-validate="'required|email'"
                                class="form-control"/>
                            <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
                        </div>
                        <div class="form-group" :class="{'has-error': errors.has('password')}">
                            <label>Password <span class="required">*</span></label>
                            <input type="password"
                                   name="password"
                                   v-model="regData.password"
                                   v-validate="'required|min:6'"
                                   class="form-control"/>
                            <span v-show="errors.has('password')" class="help text-danger">{{ errors.first('password') }}</span>
                        </div>
                        <div class="form-group" :class="{'has-error': errors.has('school')}">
                            <label>Medical School <span class="required">*</span></label>
                            <input type="text"
                                   name="school"
                                   v-model="regData.profile.medicalSchool"
                                   v-validate="'required'"
                                class="form-control" />
                            <span v-show="errors.has('school')" class="help text-danger">{{ errors.first('school') }}</span>
                        </div>
                        <div class="form-group" :class="{'has-error': errors.has('testScore')}">
                            <label>Test Scores</label>
                            <select type="text"
                                    name="testScore"
                                    v-model="regData.profile.testScore"
                                    v-validate="'required|in:[0,1,2,3,4,5]'"
                                class="form-control">
                                <option v-for="item in testTypes" v-bind:value="item.id">{{item.name}}</option>
                            </select>
                            <span v-show="errors.has('testScore')" class="help text-danger">{{ errors.first('testScore') }}</span>
                        </div>

                        <div class="form-group">
                            <label>Prior tutoring experience </label>
                            <textarea type="text"
                                      name="priorExperience"
                                      v-model="regData.profile.priorExperience"
                                      rows="3" class="form-control">

                            </textarea>
                        </div>
                        <div class="form-group">
                            <label>Unique skills to mention </label>
                            <textarea type="text"
                                      name="unique_skills"
                                      v-model="regData.profile.uniqueSkills"
                                      rows="3"
                                      class="form-control">

                            </textarea>
                        </div>
                        <div class="form-group">
                            <input class="btn btn-success btn-lg" value="Submit" type="submit" />
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>

import Vue from "vue";
import VeeValidate from "vee-validate";
import { mapGetters , mapState } from 'vuex';
import * as properties from '../../properties'

Vue.use(VeeValidate);

export default {
    name:"tutor",
    data: function () {
        return {
            testTypes:[{"id":0, "name":"-- Please select --"},
                       {"id":1,"name":"USMLE Step 1 "},
                       {"id":2,"name":"USMLE Step 2 CK "},
                       {"id":3,"name":"USMLE Step 3 "},
                       {"id":4,"name":"NBME "}],
            submitted:false,
            regData:{
                "user_type":"tutor",
                "profile": {
                    "testScore": 0,
                    "medicalSchool": "",
                    "priorExperience": "",
                    "uniqueSkills": ""
                }
            }
        }
    },
    beforeCreate() {
      
    },
    created() {

    },
    methods: {
        validateRegisterRequest:function() {
            this.submitted = true;
            this.$validator.validateAll().then((result) => {
              if(result){
                this.registerTutor();
              }

            }).catch(() => {
            });
        },
        registerTutor() {
            let me = this;
            this.$store.dispatch("registerUser",this.regData).then(data=>{
                this.$router.push("/verify/email_verification");
            }).catch(() => {
            });
        }
    }
}
</script>
