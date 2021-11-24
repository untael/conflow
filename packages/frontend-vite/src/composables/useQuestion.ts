import Question from '@/api/Question/Question'
import {Ref, ref} from 'vue'
import axios from "axios";
import * as process from "process";
import {plainToClass, classToPlain} from "class-transformer";
import Tag from "@/api/Question/Tag";

export const useQuestion = () => {
    const questions: Ref<Question[]> = ref([])

    const fetchQuestions = (count: number) => {
        for (let i = 0; i < count; i++) {
            questions.value.push(new Question({
                    id: i,
                    name: 'Lorem ipsum dolor, sit amet consectetur...',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, consectetur! Asperiores excepturi, fugiat sed tempora impedit facere consequuntur labore eligendi',
                    answer: '',
                    mark: 0,
                    rating: 5,
                    code: null,
                    date_start: 0,
                    date_end: 0,
                    time_spent: 0,
                    type: i % 3 === 0 ? 'hearing' : 'edit',
                    tags: [
                        'fundamentals',
                        'advanced',
                        'arrays',
                        'fetch',
                        'objects'
                    ],
                }),
            )
        }

    }
    const getQuestions = async () => {
        const plainQuestions: any[] = (await axios.get(`${import.meta.env.VITE_API_URL}/questions`)).data
        const mappedQuestions = plainToClass(Question, plainQuestions, {excludeExtraneousValues: true})
        return mappedQuestions
    }
    const postQuestion = (question: Question) => {
        console.log(question)
        question.tags = [
            new Tag({name: 'js', id: '1'}),
            new Tag({name: 'fundamentals', id: '2'}),
            new Tag({name: 'arrays', id: '3'}),]
        console.log('class-to-plain', classToPlain(question))
        axios.post(`${import.meta.env.VITE_API_URL}/questions`, classToPlain(question))
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return {
        fetchQuestions,
        questions,
        getQuestions,
        postQuestion,
    }
}
