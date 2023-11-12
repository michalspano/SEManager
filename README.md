## SEManager - Empowering Your Academic Journey

[![Express.js, Postman backend - SEManager](https://github.com/michalspano/SEManager/actions/workflows/server.yml/badge.svg)](https://github.com/michalspano/SEManager/actions/workflows/server.yml)

This project is adapted from the [Backend-Frontend](https://git.chalmers.se/courses/dit342/group-00-web) template and migrated to a
later later version of `Vue.js` and `Bootstrap 5`. Hence, some of
the documentation is outdated and will be updated if desired by the examiners.

<details>
<summary><b>Old Documentation</b></summary>

## Project Structure

| File                                                 | Purpose                           | What you do?                              |
| ---------------------------------------------------- | --------------------------------- | ----------------------------------------- |
| `server/`                                            | Backend server code               | All your server code                      |
| [server/README.md](server/README.md)                 | Everything about the server       | **READ ME** carefully!                    |
| `client/`                                            | Frontend client code              | All your client code                      |
| [client/README.md](client/README.md)                 | Everything about the client       | **READ ME** carefully!                    |
| [~~docs/DEPLOYMENT.md~~](docs/DEPLOYMENT.md)             | Deprecated | The remote deployment was **removed** from the scope | 
| [docs/LOCAL_DEPLOYMENT.md](docs/LOCAL_DEPLOYMENT.md) | Local production deployment       | Deploy your app local in production mode  |

## Requirements

The version numbers in brackets indicate the tested versions but feel free to use more recent versions.
You can also use alternative tools if you know how to configure them (e.g., Firefox instead of Chrome).

* [Git](https://git-scm.com/) (v2) => [installation instructions](https://www.atlassian.com/git/tutorials/install-git)
  * [Add your Git username and set your email](https://docs.gitlab.com/ce/gitlab-basics/start-using-git.html#add-your-git-username-and-set-your-email)
    * `git config --global user.name "YOUR_USERNAME"` => check `git config --global user.name`
    * `git config --global user.email "email@example.com"` => check `git config --global user.email`
  * > **Windows users**: We recommend to use the [Git Bash](https://www.atlassian.com/git/tutorials/git-bash) shell from your Git installation or the Bash shell from the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to run all shell commands for this project.
* [Chalmers GitLab](https://git.chalmers.se/) => Login with your **Chalmers CID** choosing "Sign in with" **Chalmers Login**. (contact [support@chalmers.se](mailto:support@chalmers.se) if you don't have one)
  * DIT342 course group: https://git.chalmers.se/courses/dit342
  * [Setup SSH key with Gitlab](https://docs.gitlab.com/ee/ssh/)
    * Create an SSH key pair `ssh-keygen -t ed25519 -C "email@example.com"` (skip if you already have one)
    * Add your public SSH key to your Gitlab profile under https://git.chalmers.se/profile/keys
    * Make sure the email you use to commit is registered under https://git.chalmers.se/profile/emails
  * Checkout the [Backend-Frontend](https://git.chalmers.se/courses/dit342/group-00-web) template `git clone git@git.chalmers.se:courses/dit342/group-00-web.git`
* [Server Requirements](./server/README.md#Requirements)
* [Client Requirements](./client/README.md#Requirements)

## Getting started

```bash
# Clone repository
git clone git@git.chalmers.se:courses/dit342/2023/group-15-web.git

# Change into the directory
cd group-15-web

# Setup backend
cd server && npm install
npm run dev

# Setup frontend
cd client && npm install
npm run serve
```

## Visual Studio Code (VSCode) Support

Open the `server` and `client` in separate VSCode workspaces or open the combined [backend-frontend.code-workspace](./backend-frontend.code-workspace). Otherwise, workspace-specific settings don't work properly.

</details>

## System Definition (MS0)

The following describes the project's system definition.

### Purpose

Our project is focused on improving the experience of the `SEM` (Software Engineering and Management) students by providing a tool
that allows them to easily **visualize** the programme's structure.
This would allow the students to **plan** their studies, **track** their progress, and understand the **pre-requisites** of each course.
Furthermore, the user is also be able to interact with the course curriculum to **personalize their study plan**.
For instance, in the event that the student wants to take a study break, failed a course, is doing an exchange year, etc.

### Pages

The following section contains the description of the pages that will be implemented in the project.

#### Login screen

This page will be the first page that the user will see when accessing the website.
There's two possible scenarios: (i) guest user, and (ii) registered user (i.e., student or an administrator). For now, the focus will be on the former; the guest user cannot access the main dashboard (home) without logging in (to prevent share of personal information).

#### Main Dashboard (Home)

The **main dashboard** is a fundamental page of the website. It is essentially a much improved version of
the current **static** picture with the structure of the programme. The user will be able to interact with the
courses to highlight a **study path** and create a personalized *"study journey"*.

At each point in time, the user is unable to uncheck a course that has been marked as completed and the path is automatically updated to reflect the change. Furthermore, the user can also add a course to their study plan by clicking on the course and selecting the desired study period.

#### Course Page

When the user clicks on a course, the application will display all the relevant **course information** such as the teaching staff and the pre-requisites. The user can navigate back to the dashboard or to another course that has a dependency on the current course.

#### Employee Information (Pop-up)

Given a selected course, the user can click on the teaching staff to display their information. This will be displayed in a pop-up window centered on the screen. This pop-up contains additional information about the teacher. From there, the user can navigate back to the Main Dashboard or close the pop-up.

#### Admin Page

A restricted page that is only accessible to the administrators. This page allows the administrators to add, update, remove entities to the system (see the ER diagram below). For instance, the administrator can add a new course, update the course information, remove a course from the system, or create an employee and assign them to a course.

The Admin page contains a component that serves the role of a **manual** to help the administrator to use the page. This component contains a description of the page and a list of all the possible actions that the administrator can perform.

#### `404` Page

In case the user tries to access a page that does not exist, the application will display a 404 page.

### Entity-Relationship (ER) Diagram

![ER Diagram](./images/er_diagram.png)

## Teaser (MS3)

![Teaser](./images/teaser.png)
