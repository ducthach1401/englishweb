import { Application, Response, Request } from "express";
import path from "path";

export class routeView {
  private dirHtml: any = __dirname + "/../html";
  private dirCss: any = __dirname + "/../css";

  public route(app: Application) {
    app.get("/", (req: Request, res: Response) => {
      if (req.cookies.access_token != null) {
        res.sendFile(path.resolve(this.dirHtml + "/home.html"));
      } else {
        res.redirect("/login");
      }
    });

    app.get("/login", (req: Request, res: Response) => {
      if (req.cookies.access_token != null) {
        res.redirect("/");
      } else {
        res.sendFile(path.resolve(this.dirHtml + "/login.html"));
      }
    });

    app.get("/register", (req: Request, res: Response) => {
      if (req.cookies.access_token != null) {
        res.redirect("/");
      } else {
        res.sendFile(path.resolve(this.dirHtml + "/register.html"));
      }
    });

    app.get("/logout", (req: Request, res: Response) => {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      res.redirect("/");
    });

    app.get("/vocabulary/:english", (req: Request, res: Response) => {
      if (req.cookies.access_token != null) {
        res.sendFile(path.resolve(this.dirHtml + "/vocabulary.html"));
      } else {
        res.redirect("/login");
      }
    });

    app.get("/changeName", (req: Request, res: Response) => {
      if (req.cookies.access_token != null) {
        res.sendFile(path.resolve(this.dirHtml + "/changeName.html"));
      } else {
        res.redirect("/login");
      }
    });

    app.get("/changePassword", (req: Request, res: Response) => {
      if (req.cookies.access_token != null) {
        res.sendFile(path.resolve(this.dirHtml + "/changePassword.html"));
      } else {
        res.redirect("/login");
      }
    });

    app.get("/quiz/:english", (req: Request, res: Response) => {
      if (req.cookies.access_token != null) {
        res.sendFile(path.resolve(this.dirHtml + "/quiz.html"));
      } else {
        res.redirect("/login");
      }
    });

    app.get("/exam", (req: Request, res: Response) => {
      if (req.cookies.access_token != null) {
        res.sendFile(path.resolve(this.dirHtml + "/exam.html"));
      } else {
        res.redirect("/login");
      }
    });
  }
}
