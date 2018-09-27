<template>
    <section class="student-reviews">
        <div class="container">
            <h1 class="text-center main-title"> Student Reviews </h1>
            <div class="row">
                <swiper :options="swiperOption" data-swiper-autoplay="2000">
                    <swiper-slide v-for="review in reviews" :key="review.id">

                        <div class="row collapsed">
                            <div class="col-xs-12">
                                <blockquote class="review-box">
                                    <p>{{review.content }} <!--| truncate(450)--> </p>
                                    <footer>- {{review.student_name}} {{review.degree}} ( {{review.course_type}} ) <cite
                                            title="Source Title">{{review.training}}</cite></footer>
                                </blockquote>
                            </div>
                        </div>

                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>

            </div>

        </div>
    </section>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import StudentService from './../../../services/OtherServices'

    export default {
        name: "student-reviews",
        components: {
            swiper,
            swiperSlide

        },
        data() {
            return {
                swiperOption: {
                    pagination: '.swiper-pagination', /* '.swiper-pagination' */
                    paginationClickable: true,
                    autoplay: 5000,
                    grabCursor: true,
                    loop: true,
                    autoHeight: true
                },
                reviews: [
                    {
                        "id": 1,
                        "student_email": "apostone@gmail.com",
                        "student_name": "A.P.",
                        "degree": "MD",
                        "training": "Family Medicine Residency Program",
                        "course_type": "USMLE Step 1",
                        "content": "I initially worked with Akshay a few years ago after I had failed Step 1. We worked together via video chat which worked out great for both of our busy schedules and allowed Akshay to utilize technology to enhance my learning experience. Each session, Akshay used technology creatively to track my progress, to address my personal weaknesses and then to build skills and techniques to target my individual needs. Akshay is compassionate and patient with his students; he greatly improved my confidence as a test taker and helped me strengthen my knowledge base. I am happy to report that not only did I pass Step 1 with a much stronger score, but, even after we stopped working together, I continued to use his strategies as I prepared for subsequent tests and recently aced my specialty boards. I've worked with various tutors throughout my life and I would definitely say that Akshay stands out as unique. Akshay is clearly passionate about teaching and I would recommend him highly to anyone who is struggling or just looking to improve their score or medical knowledge."
                    },
                    {
                        "id": 2,
                        "student_email": "my@gmail.com",
                        "student_name": "M.Y.",
                        "degree": "MD",
                        "course_type": "USMLE Step 2 CK ",
                        "training": "Family Medicine Residency Program",
                        "content": "When I failed the USMLE Step 2 CK, I was concerned at that I had reached my peak in knowledge retention.  Leading up to the exam, I had read from multiple sources and completed over 2000 practice questions.  Still, I felt unprepared to make a second attempt and was afraid I would never pass the exam.  As a last effort, I decided to get a tutor. \n\nStarting from my very first session with Akshay, I knew that he was the right tutor for me--one who would be able to guide me through what I had yet to learn.  He dissected the way I had been approaching questions, refined my study schedule, and gave me tips on how to become more efficient.  He taught me methods that helped drastically increase my ability to retain information.  He also streamlined my studying so that I wasted less time on the unimportant things.  Besides all that, Akshay was a great source of motivation and confidence.  \n\nWith Akshay's help and support, I was able to successfully pass Step 2 CK by a good margin and ended up matching into a University residency program.  I now apply his methods to all of my learning and never hesitate to recommend him to people I know.\n"
                    },
                    {
                        "id": 3,
                        "student_email": "dl@gmail.com",
                        "student_name": "D.L.",
                        "degree": "MD",
                        "training": "Family Medicine Residency Program",
                        "course_type": "USMLE Step 1",
                        "content": "Akshay is not only an expert in medical knowledge, but also a master educator who knows exactly how to tailor lesson plans to maximize retention, recall, and deep understanding of complex topics. Through his help I went from failing USMLE Step 1 to getting my number one residency in my chosen specialty. If I'd have found him sooner, I would have saved many hours and hundreds of dollars wasted on less worthy educational resources that I tried, including Kaplan and Doctors in Training. Now as a resident in clinical practice, the learning habits he taught me help me excel far beyond my peers. His methodology the epitome of \"high-yield\" learning. If you want the easiest, most efficient and most entertaining path to medical mastery, look no further!"
                    },
                    {
                        "id": 4,
                        "student_email": "dk@gmail.com",
                        "student_name": "D.K.",
                        "degree": " ",
                        "training": "Medical School Applying for Neurology",
                        "course_type": "USMLE Step 1",
                        "content": "Akshay is highly knowledgeable and is very good at explaining difficult concepts with clarity and simplicity, particularly pathophysiology which can be quite dense.  He's a kind and caring teacher as well.  It was a pleasure working with him!"
                    }
                ]
            }
        },
        mounted() {

        },
        beforeCreate() {

        },
        created() {

        }
    }
</script>

