# Queries ejecutadas en el curso en GraphiQL

## Alias y Fragments

```graphql
{
  AllCourses: getCourses{
    ...CourseFields
  }

  Course1: getCourse(id: "5cb4b8ce75f954a0585f7be2"){
    ...CourseFields
    teacher
  }

  Course2: getCourse(id: "5cb4b8ce75f954a0585f7be4"){
    ...CourseFields
    topic
  }
}

fragment CourseFields on Course {
  _id
  title
  description
  people {
    _id
    name
  }
}
```

## Variables

```graphql
query GetCourse2 ($course: ID!) {
  getCourse(id: $course){
   _id
    title
    people{
      _id
      name
    }
  }
}

mutation CreateMonitor($monitorinput: PersonInput!){
  createPerson(input: $monitorinput){
    _id
    name
    email
    __typename
  }
}
```

```graphql
{
  "monitorinput": {
    "name": "gohan",
    "email": "goh@a.com",
    "phone": "545"
  }
}
```
Requiere un objeto JSON como:

```json
{
  "course": "5cb4b8ce75f954a0585f7be3"
}
```
#### using fracment with type
Select different fields depend on it type

```graphql
{
  getPeople{
    _id
    name
    ... on Monitor {
      phone
    }
  }
}
```

#### Directives

`@include(if: Boolean)` Only include this field in the result if the argument is true.
`@skip(if: Boolean)` Skip this field if the argument is true.

```graphql
query custom($isMonitor: Boolean!){
  getPeople{
    _id
    name
    ... on Student @skip(if: $isMonitor){
      avatar
    }
    ... on Monitor @include(if: $isMonitor){
      phone
      email
    }
  }
}
```
#### Using query to ger a entity fro mmultiple entities depeon on key value

```graphql
query custom($key: TypeKey!){
  getEntity(key: $key){
    __typename
    ... on Course{
      title
    }
    ... on Student{
      name
      avatar
    }
    ... on Monitor{
      name
      phone
    }
  }
}
```


