import os
refpath=os.path.join(r"Sample.txt")
from gpt4all import GPT4All
model = GPT4All(r"Llama-3.2-1B-Instruct-Q4_0.gguf")
Name=input("Please enter your name:")
age=input("Please enter your age:")
print("Enter 3 skills that you have\n")
Skill1=input("Please enter your skill(Name only):")
Skill2=input("Please enter your second skill(Name only):")
Skill3=input("Please enter your third skill(Name only):")
MyImg=input("Please enter the path of your photo:")
Project=input("Enter a project that you have built:")
Projectimg=input("Enter a project image:")
FileName=input("Enter file name:")
Theme=input("Select a theme from the following(type the theme number from the below options):\n1.Blue\n2.Red\n3.Green\n")
txtcol1="light"
navcol="light"
txtcol2="light"
Theme2="light"
if(Theme=="1"):
    Theme1="primary"
    bgc="primary"
if(Theme=="2"):
    Theme1="danger"
    bgc="danger"
if(Theme=="3"):
    Theme1="success"
    bgc="success"
print("Generating the portfolio...")
with model.chat_session():
    Response=model.generate(f"Write a portfolio based on the following details. Name:{Name}, age:{age},skills:{Skill1},{Skill2},{Skill3},project:{Project},add proper new lines, do not prepend anything.", max_tokens=1024)
    print("Writing about Skill 1...")
    Response1=model.generate(f"Elaborate about this skill? {Skill1}",max_tokens=100)
    print("Writing about Skill 2...")
    Response2=model.generate(f"Elaborate about this skill? {Skill2}",max_tokens=100)
    print("Writing about Skill 3...")
    Response3=model.generate(f"Elaborate about this skill? {Skill3}",max_tokens=100)
    print("Writing about Project...")
    MyProject=model.generate(f"Write about this project? {Project}",max_tokens=100)
print("Reading the reference file...")
filepath=os.path.join(FileName+".html")
file=open(refpath,"r")
Template=file.read()
file.close()
FinalCode=Template.replace("{Name}", Name).replace("{Response}", Response).replace("{Theme1}", Theme1).replace("{txtcol1}", txtcol1) .replace("{txtcol2}", txtcol2).replace("{Response1}",Response1).replace("{txtcol1}", txtcol1) .replace("{txtcol2}", txtcol2).replace("{Response2}",Response2).replace("{txtcol1}", txtcol1) .replace("{txtcol2}", txtcol2).replace("{Response3}",Response3).replace("{txtcol1}", txtcol1) .replace("{txtcol2}", txtcol2).replace("{Skill1}",Skill1)\
.replace("{Skill2}",Skill2).replace("{Skill3}",Skill3).replace("{Project}",Project).replace("{MyProject}",MyProject).replace("{bgc}",bgc)
Final=open(filepath,"w")
Final.write(FinalCode)
Final.close()
print("Portfolio Generation Complete.")
