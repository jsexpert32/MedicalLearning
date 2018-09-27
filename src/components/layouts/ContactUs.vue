<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2 contact-container">
        <div class="text-center">
          <h1>Contact Us</h1>
          <p class=""> Fill out the form to learn more, or login to schedule your <strong><u>discounted trial
            session</u></strong></p>
        </div>
        <hr>
        <div class="well">
          <form @submit.prevent="validateContactRequest()" novalidate>
            <div class="contact-form">
              <div class="row">
                <div class="col-xs-12 col-md-6">
                  <div class="form-group" :class="{'has-error': errors.has('firstName')}">
                    <label>First Name <span class="required">*</span></label>
                    <input type="text"
                           name="firstName"
                           v-model="contactData.firstname"
                           v-validate="'required'"
                           class="form-control" placeholder="First Name"/>
                    <span v-show="errors.has('firstName')"
                          class="help text-danger">{{ errors.first('firstName') }}</span>
                  </div>
                </div>
                <div class="col-xs-13 col-md-6">
                  <div class="form-group" :class="{'has-error': errors.has('lastName')}">
                    <label>Last Name <span class="required">*</span></label>
                    <input type="text"
                           name="lastName"
                           v-model="contactData.lastname"
                           v-validate="'required'"
                           class="form-control"
                           placeholder="Last Name"/>
                    <span v-show="errors.has('lastName')"
                          class="help text-danger">{{ errors.first('lastName') }}</span>
                  </div>
                </div>
                <div class="clearfix"></div>
                <div class="col-xs-12 col-md-6">
                  <div class="form-group" :class="{'has-error': errors.has('emailAddress')}">
                    <label for="emailAddress">Email Address <span class="required">*</span> </label>
                    <input type="text"
                           id="emailAddress"
                           name="emailAddress"
                           v-model="contactData.email"
                           v-validate="'required|email'"
                           placeholder="Email"
                           class="form-control"/>
                    <span v-show="errors.has('emailAddress')" class="help text-danger">{{ errors.first('emailAddress') }}</span>
                  </div>
                </div>
                <div class="col-xs-12 col-md-6">
                  <div class="form-group" :class="{'has-error': errors.has('testType')}">
                    <label>Test Type <span class="required">*</span></label>
                    <select type="text"
                            name="testType"
                            v-model="contactData.type"
                            v-validate="'required|in:[0,1,2,3,4,5,6,7,8]'"
                            class="form-control"
                            selected='testTypes[0]'
                    >
                      <option v-for="item in testTypes" v-bind:value="item.id">{{item.name}}</option>
                    </select>
                    <span v-show="errors.has('testType')"
                          class="help text-danger">{{ errors.first('testType') }}</span>
                  </div>
                </div>
                <div class="clearfix"></div>
                <div class="col-xs-12 ">
                  <div class="form-group" :class="{'has-error': errors.has('comments')}">
                    <label>Questions & Comments <span class="required">*</span></label>
                    <textarea type="text"
                              name="comments"
                              v-model="contactData.message"
                              v-validate="'required'"
                              rows="4" class="form-control"/>
                    <span v-show="errors.has('comments')" class="help text-danger">{{ errors.first('comments') }}</span>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-success btn-lg" type="submit"> Submit</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import {mapGetters, mapState} from 'vuex'
  import swal from 'sweetalert2'
  import * as properties from '../../properties'
  import ContactService from './../../services/OtherServices'

  export default {
    name: "contact-us",
    data: function () {
      return {
        testTypes: [
          {"id": 0, "name": "-- Please Select -- "},
          {"id": 1, "name": "USMLE Step 1 "},
          {"id": 2, "name": "USMLE Step 2 CK "},
          {"id": 3, "name": "USMLE Step 3 "},
          {"id": 4, "name": "NBME "},
          {"id": 5, "name": "ABIM "},
          {"id": 6, "name": "Medical Coursework "},
          {"id": 7, "name": "Other "}],
        whereheards: ["Facebook/Facebook Ad ", "Google Search/Google Ad ", "Referral/Other "],
        submitted: false,
        contactSucced: false,
        contactData: {
          "type": 0

        }
      }
    },
    beforeCreate() {

    },
    created() {

    },
    mounted() {
    },
    methods: {
      validateContactRequest() {
        this.submitted = true;
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.sendContactRequest();
          }

        }).catch(() => {
        });
      },
      async sendContactRequest() {
        try {
          const response = await ContactService.contact(this.contactData)
          if (response.status === 200 || response.data.success === true) {
            const self = this
            swal({
              title: '<h2>Thanks</h2>',
              type: 'success',
              timer: 3000,
              text: 'Thank you for submitting the contact form! We will be in touch shortly.',
              showCloseButton: false,
              showCancelButton: false,
            }).then(
              function () {

              },
              // handling the promise rejection
              function (dismiss) {
                if (dismiss === 'timer') {
                  self.$router.push({name: 'home'})
                }
              }
            )

          }
        } catch (err) {
          swal(
            'Error!',
            err.response.data.error,
            'error'
          );
        }

      }
    }
  }
</script>

