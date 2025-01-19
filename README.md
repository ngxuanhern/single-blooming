To run this website, follow the steps below:
1. Go to C:\Users\ADMIN\apache-tomcat-11.0.2\bins, execute startup.bat. If apache tomcat had run, execute shutdown.bat.
2. Open Intellij, and open terminal.
3. cd into florist again, C:\florist\florist
4. Run mvn clean package
5. Copy the florist-1.0-SNAPSHOT.war from the target directory and paste into C:\Users\ADMIN\apache-tomcat-11.0.2\webapps.
6. cd into frontend, C:\florist\florist\frontend
7. run npm run dev

** If your localhost is not in 5173, you had to change the response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); to your localhost address.
These are all in florist/src/main/java/org/example
