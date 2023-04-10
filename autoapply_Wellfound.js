console.log("code start");
const text = "Done";
// AngelList has 3 types of forms - usual one, one that asks to update location, upload resume
const learn_more_button_class_name = "styles-module_component__88XzG !m-0 w-full styles_component__sMuDw";
const apply_button_class_name = "styles-module_component__88XzG styles_component__Ov6jE styles_actionButton__lHu5I styles_component__sMuDw";
const send_appication_class_name = "styles-module_component__88XzG styles_component__sMuDw"
const update_location_string = "update your location";
const resume_cv_string = "resume/cv";
const cancel_button_class_name = "styles_component__3A0_k styles_alternate__2u_Hm styles_regular__3b1-C styles_component__sMuDw";
const jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

// remove the case statement
const helper = async (message, sender, sendResponse) => {
      const jobs_apply = 30
      let jobs_applied = 0;
      let start = 0;
      while (jobs_applied <= jobs_apply) {
        let learn_more_buttons = document.getElementsByClassName(learn_more_button_class_name);
        let size = learn_more_buttons.length;
        console.log("number of jobs = " + size);
        for (let i = start; i < size; i++) {
          let buttioni = learn_more_buttons[i];
          if (!buttioni) {
            continue;
          }
          buttioni.click();
          await new Promise((r) => setTimeout(r, 3000));
          try {
            // When the form asks to update the location preference or upload resume
            let apply_button = document.getElementsByClassName(apply_button_class_name)[0];
            apply_button.click();
            await new Promise((r) => setTimeout(r, 3000));
            if (
                (document.body.innerHTML.toLowerCase().search(update_location_string) > 0) ||
                (document.body.innerHTML.toLowerCase().search(resume_cv_string) > 0)
            )  {
              console.log("This is error form")
              let cancelBtn = document.getElementsByClassName(cancel_button_class_name);
              cancelBtn.length && cancelBtn[0].click();
            }

            else {
              let form_button = document.getElementsByClassName(send_appication_class_name);
              let form = document.getElementById("form-input--userNote");

              // let radio_btn = "styles-module_radio__18RgL"
              let hackReactInput = function (i, v) {
                let input = i;
                let lastValue = input.textContent;
                input.textContent = v;
                let event = new Event('input', {
                  bubbles: true
                });
                event.simulated = true;
                let tracker = input._valueTracker;
                if (tracker) {
                  tracker.setValue(lastValue);
                }
                input.dispatchEvent(event);
                event.cancelBubble = () => {};
              };
            //   radio_group =  document.getElementsByClassName(radio_btn)
            //   if (radio_group) {
            //     radio_group[1].click()
            //   }
              hackReactInput(form, message);
            //   form.value = "hi";
            //   console.log("waiting again");
              await new Promise((r) => setTimeout(r, 1000));
              let text1 = document.getElementsByClassName("styles-module_component__3ZI84 styles_startupName__Ysow2")[0].innerText
              let text2 = document.getElementsByClassName("styles-module_component__3ZI84 styles_jobTitle__Ykp_Y")[0].innerText
              console.log("form submitting for ", text1, text2);
              form_button[form_button.length-1].click();
              jobs_applied = jobs_applied + 1;
            //   let eb = document.getElementsByClassName( "styles-module_component__88XzG styles_component__sMuDw");
            //   eb[0].click();
              const close_button = $('.styles_footer__OuAC2').find(":button")[0]
              close_button.click()
              console.log("Jobs applied so far: ", jobs_applied);
              if(jobs_applied > 30){
                break;
              }
              
            }
          } catch (err) {
            console.log(err);
            console.log("Cant fill form for this company");
            const cancel_button = $('.styles_component__0_zKL').find(':button')[0]
            if (cancel_button) cancel_button.click()
            const close_button = $('.styles_footer__OuAC2').find(":button")[0]
            if (close_button) close_button.click()
          }
        }
        window.scrollBy(0, 10 * document.body.scrollHeight);
        await new Promise((r) => setTimeout(r, 5000));
        start = size-5;
        if(jobs_applied > jobs_apply){
          break;
        }
      }
      console.log(text);
      sendResponse(text);
  }

const message = "";
helper(message);
