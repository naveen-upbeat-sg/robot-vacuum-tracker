# robot-vacuum-tracker
A Material UI based ReactJS application that displays the movements of Robot Vacuum based on the commands

Steps to run this project
### On GitHub IO Pages
    * Visit [https://naveen-upbeat-sg.github.io/robot-vacuum-tracker/build/](https://naveen-upbeat-sg.github.io/robot-vacuum-tracker/build/)


### On local developer desktop
    * Install basic developer tools -> nodejs, nvm
    * `npm run install`
    * `npm run start` #this will open a browser will page on  http://localhost:3020/

### Running Unit tests
    * `npm run test`

### Run a custom test with input from command line and optionally pass expected output for assertion
    * `npm run test:custom --  try="PLACE 0,0,EAST|MOVE|MOVE|REPORT" expected="2,0,EAST"`
#### Some more details about the format:
the custom argument try="<List of commands>" must be separated by the delimiter "|".
the custom argument expected="<OUTPUT>" can be used to quickly assert if the test results expected output.

![Refer to this image](https://naveen-upbeat-sg.github.io/robot-vacuum-tracker/build/img/imgForReadMe/Robot-vacuum4.png)

![Refer to this image](https://naveen-upbeat-sg.github.io/robot-vacuum-tracker/build/img/imgForReadMe/Robot-vacuum5.png)

if this argument is not passed,![Refer to this image](https://naveen-upbeat-sg.github.io/robot-vacuum-tracker/build/img/imgForReadMe/Robot-vacuum7.png)

 the test just outputs the result of the command, and runs succesfully.

### Running end-to-end testing
    * `npm run cypress:open`