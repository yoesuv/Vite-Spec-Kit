# Vite + Spec Kit

Personal research about spec-driven development using [Github Spec-Kit](https://github.com/github/spec-kit)

### Constitution

```
declare principles for clean code, simple UX, responsive design,
user experience consistency, performance requirements and minimal dependencies.
no testing unit (no unit test, no integration test, etc) - this must supersede any other guidance.
```

### Specification

```
initial page setup - this application should be web application called "Vite SpecKit".
there should be top navigation sticky with horizontal menu "Home", "Create", This menu should be in the center top navigation.
on the right top navigation is icon switch light/dark theme, default is light.
below top navigation is list post with UI card style with pagination per page 20, in the bottom have pagination number.
this item post have two menu on the right, edit and delete.
when click edit then go to edit page, similar like create page from top app bar.
when click delete then show confirmation do delete if delete confirmed then remove the item post or reload list post.
if card item post clicked then go to detail post. top navigation also stay visible to navigate.
page create, edit, detail is form with Card style, inside this card have Row with arrow back (go to previous) and title for each create, edit, detail.
page create and edit after success show message then redirect to Home (list post). all create/edit form should use validate input.
```

### Plan

```
plan this using antdesign for UI components.Yup for validation.
tanstack query + axios for API.
and use base API url from https://jsonplaceholder.typicode.com/guide/.
no unit test, integration test or other test at all.
```

### Screenshots

| ![](https://i.imgur.com/a7GTeEA.png) | ![](https://i.imgur.com/KhYK2Ne.png) |
| :----------------------------------: | :----------------------------------: |
| ![](https://i.imgur.com/NdvhAML.png) | ![](https://i.imgur.com/6s4oCEI.png) |
| ![](https://i.imgur.com/Xm3MKZV.png) | ![](https://i.imgur.com/SFCnQ0H.png) |

### Packages

- [Ant Design](https://ant.design/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Yup](https://github.com/jquense/yup)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
