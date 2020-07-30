import { Link } from '@redwoodjs/router'
import { Form, FieldError, TextAreaField, TextField, Submit, Label, 
    useMutation, FormError } from '@redwoodjs/web'
import BlogLayout from 'src/layouts/BlogLayout'
import { useForm } from 'react-hook-form'

const CREATE_CONTACT = gql`
    mutation CreateContactMutation($input: CreateContactInput!) {
        createContact(input: $input) {
            id
        }
    }
`

const ContactPage = () => {
    const formMethods = useForm()

    const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
        onCompleted: () => {
            alert('Thank you!')
            formMethods.reset()
        }
    })

    const onSubmit = (data) => {
        create({
            variables: {
                input: data
            }
        })
        console.log(data)
    }
    
  return (
     <BlogLayout>
        <Form onSubmit={onSubmit} validation={{mode: 'onBlur'}} error={error}
            formMethods={formMethods}
        >
            <FormError 
                error={error}
                wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
            />
            <Label name="name" errorClassName="error">Name</Label>
            <TextField 
                name="name" 
                validation={{required: true}}
                errorClassName="error"    
            />
            <FieldError name="name" className="error"/>

            
            <Label name="email" errorClassName="error">Email</Label>
            <TextField name="email" 
                validation={{
                    required: true,
                }} errorClassName="error"/>
            <FieldError name="email" className="error"/>
            
            <Label name="message" errorClassName="error">Message</Label>
            <TextAreaField name="message" validation={{required: true}} errorClassName="error" />
            <FieldError name="message" className="error"/>

            <Submit disabled={loading}>Save</Submit>
        </Form>
     </BlogLayout>
  )
}

export default ContactPage
