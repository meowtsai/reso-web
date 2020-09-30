var idv = {
  Url: "//api.idvtwcampus.com/v1",
  FindTeam: function () {
    var OwnHunter = +$("#OwnHunter").val();
    var OwnSurvivor = +$("#OwnSurvivor").val();
    var NeedHunter = +$("#NeedHunter").val();
    var NeedSurvivor = +$("#NeedSurvivor").val();
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone_code").html() + "-" + $("#phone").val();
    var birthday = $("#birthday").val();
    var line_id = $("#line_id").val();
    var game_id = $("#game_id").val();
    var game_name = $("#game_name").val();
    if (OwnHunter + NeedHunter != 1) {
      comm.alert("請正確填寫監管者人數");
      $("#OwnHunter").focus();
      return;
    }
    if (OwnSurvivor + NeedSurvivor != 4) {
      comm.alert("請正確填寫求生者人數");
      $("#NeedHunter").focus();
      return;
    }
    if (OwnHunter >= 1 && OwnSurvivor >= 4) {
      comm.alert("您已經滿足戰隊報名的條件，無需尋找隊友");
      $("#OwnHunter").focus();
      return;
    }
    if (OwnHunter == 0 && OwnSurvivor == 0) {
      comm.alert("您至少需要擁有1名選手");
      $("#OwnHunter").focus();
      return;
    }
    if (!comm.CheckName($("#name")[0])) return;
    if (!comm.CheckMail($("#email")[0])) return;
    if (!comm.CheckPhone($("#phone")[0])) return;
    if (!comm.CheckBirthday($("#birthday")[0])) return;
    if (!comm.CheckLineID($("#line_id")[0])) return;
    if (!comm.CheckGameID($("#game_id")[0])) return;
    if (!comm.CheckGameName($("#game_name")[0])) return;
    $("#loading_wrap").show();
    milo.Request(
      idv.Url + "/team/match",
      "get",
      {
        have: JSON.stringify({
          s: OwnHunter,
          e: OwnSurvivor,
        }),
        need: JSON.stringify({
          s: NeedHunter,
          e: NeedSurvivor,
        }),
        name: name,
        email: email,
        phone: phone,
        birthday: birthday,
        line_id: line_id,
        game_id: game_id,
        game_name: game_name,
      },
      function (res) {
        $("#loading_wrap").hide();
        if (res.code != 0) {
          comm.alert(res.msg);
        } else {
          comm.alert("您已報名成功，請注意後續系統配對信件");
        }
        // console.log(res)
      }
    );
  },
  Submit: function () {
    if (!$("#Policy")[0].checked) {
      comm.alert("請勾選我已經閱讀賽事規章並且同意");
      $("#Policy").focus();
      return;
    }
    var team_name = $(".team_name").val();
    var captain_name = $("#captain .name").val();
    var gender = 0;
    $(":input[name=gender]").each(function () {
      if ($(this)[0].checked) {
        gender = $(this).val();
      }
    });
    var captain_phone =
      $("#captain .phone_code").html() + "-" + $("#captain .phone").val();
    var captain_line = $("#captain .line_id").val();
    var captain_birthday = $("#captain .birthday").val();
    var captain_mail = $("#captain .email").val();
    var captain_verify_code = $("#captain .verify_code").val();
    var captain_game_id = $("#captain .game_id").val();
    var captain_game_name = $("#captain .game_name").val();
    var captain_role = 0;
    $("#captain")
      .find(":input[name=role]")
      .each(function () {
        if ($(this)[0].checked) {
          captain_role = $(this).val();
        }
      });
    var captain_school = $("#captain .captain_school").val();
    var captain_stuPic =
      $(".captain-upload1 img").attr("src") +
      "," +
      $(".captain-upload2 img").attr("src");
    if (captain_stuPic == ",") {
      comm.alert("請上傳隊長學生證或有效在學證明");
      return false;
    }

    if (!comm.CheckTeam($(".team_name")[0])) return;
    if (!comm.CheckName($("#captain .name")[0])) return;
    if (!comm.CheckMail($("#captain .email")[0])) return;
    if (!comm.CheckPhone($("#captain .phone")[0])) return;
    if (!comm.CheckBirthday($("#captain .birthday")[0])) return;
    if (!comm.CheckLineID($("#captain .line_id")[0])) return;
    if (!comm.CheckGameID($("#captain .game_id")[0])) return;
    if (!comm.CheckGameName($("#captain .game_name")[0])) return;
    if (!comm.CheckCode($("#captain .verify_code")[0])) return;
    if (captain_role == 0) {
      comm.alert("請選擇隊長擔任的角色");
      $("#captain ").find(":input[name=role]").eq(0).focus();
      return;
    }
    if (!comm.CheckSchool($("#captain .captain_school")[0])) return;

    var summoner = [];
    var flag = true;
    $("#summoner section").each(function (i, v) {
      var name = $(this).find(".name").val();
      var birthday = $(this)
        .find(".birthday_" + (i + 1))
        .val();
      var line_id = $(this).find(".line_id").val();
      var game_id = $(this).find(".game_id").val();
      var role = 0;
      $(this)
        .find(":input[name=role_" + (i + 1) + "]")
        .each(function () {
          if ($(this)[0].checked) {
            role = $(this).val();
          }
        });
      var school_name = $(this).find(".school").val();
      var summoner_stuPic =
        $("div[data-img=img2_" + (i + 1) + "_1]")
          .find("img")
          .attr("src") +
        "," +
        $("div[data-img=img2_" + (i + 1) + "_2]")
          .find("img")
          .attr("src");

      if (
        summoner.length < 4 ||
        (name != "" &&
          birthday != "" &&
          line_id != "" &&
          game_id != "" &&
          role != 0 &&
          school_name != "")
      ) {
        if (
          !comm.CheckName(
            $(this).find(".name")[0],
            "請正確填寫隊員" + (i + 1) + "的姓名"
          )
        ) {
          flag = false;
          return false;
        }
        if (
          !comm.CheckBirthday(
            $(this).find(".birthday_" + (i + 1))[0],
            "請正確填寫隊員" + (i + 1) + "的出生日期"
          )
        ) {
          flag = false;
          return false;
        }
        if (
          !comm.CheckLineID(
            $(this).find(".line_id")[0],
            "請正確填寫隊員" + (i + 1) + "的Line_ID"
          )
        ) {
          alert(3);
          flag = false;
          return false;
        }
        if (
          !comm.CheckGameID(
            $(this).find(".game_id")[0],
            "請正確填寫隊員" + (i + 1) + "的Game_ID"
          )
        ) {
          flag = false;
          return false;
        }
        if (role == 0) {
          comm.alert("請選擇隊員" + (i + 1) + "擔任的角色");
          $(this)
            .find(":input[name=role_" + (i + 1) + "]")
            .eq(0)
            .focus();
          flag = false;
          return false;
        }
        if (
          !comm.CheckSchool(
            $(this).find(".school")[0],
            "請正確填寫隊員" + (i + 1) + "的學校全名"
          )
        ) {
          flag = false;
          return false;
        }
        if (summoner_stuPic == ",") {
          comm.alert("請上傳隊員" + (i + 1) + "的學生證或有效在學證明");
          flag = false;
          return false;
        }
        summoner.push({
          name: name,
          line_id: line_id,
          birthday: birthday,
          game_id: game_id,
          role: role,
          school_name: school_name,
          std_cert: summoner_stuPic,
        });
        console.log(summoner);
      }
    });

    if (!flag) return;
    $("#loading_wrap").show();

    milo.Request(
      idv.Url + "/team/create",
      "get",
      {
        team_name: team_name,
        captain: JSON.stringify({
          name: captain_name,
          gender: gender,
          phone: captain_phone,
          line_id: captain_line,
          birthday: captain_birthday,
          email: captain_mail,
          verify_code: captain_verify_code,
          game_name: captain_game_name,
          game_id: captain_game_id,
          role: captain_role,
          school_name: captain_school,
          std_cert: captain_stuPic,
        }),
        summoner: JSON.stringify(summoner),
      },
      function (res) {
        $("#loading_wrap").hide();
        if (res.code != 0) {
          comm.alert(res.msg);
        } else {
          comm.alert("報名成功");
          setTimeout(function () {
            location.href = "./index.html";
          }, 2000);
        }
        console.log(res);
      }
    );
  },
  Sendverify: function () {
    var email = $("#captain .email").val();
    if (!comm.CheckMail($("#captain .email")[0])) return;
    $("#loading_wrap").show();
    milo.Request(
      idv.Url + "/team/codesend",
      "get",
      {
        email: email,
      },
      function (res) {
        $("#loading_wrap").hide();
        if (res.code != 0) {
          comm.alert(res.msg);
        } else {
          comm.alert("電子信件發送成功");
        }
      }
    );
  },

  uploadImgMoreNormall: function () {
    layui.use("upload", function () {
      var $ = layui.jquery,
        upload = layui.upload;

      upload.render({
        elem: ".uploadImg",
        url: "https://api.lolseatour.com/v1/common/upload",
        field: "image",
        // size: "4096",
        before: function () {
          let item = this.item;
          // console.log(item); //获取当前触发上传的元素，layui 2.1.0 新增
          let filename = item.context.attributes["filename"].value;
          // console.log(filename)
          $("#loading_wrap").show();
        },
        done: function (res, index, upload) {
          $("#loading_wrap").hide();
          let item = this.item;
          let attr_img = item.context.attributes["data-img"].value;
          // console.log(attr_img)

          if (res.code != 0) {
            if (res.code == 50002) {
              comm.alert("檔案過大，請控制或壓縮在 4MB 以下");
            } else {
              comm.alert(res.msg);
            }
            return;
          } else {
            $("div[data-img=" + attr_img + "]")
              .find("img")
              .attr("src", res.data.url);
          }
        },
      });
    });
  },

  timeSignUp: function () {
    var endTime = "1594828800";

    var Time1 = setInterval(function () {
      var nowTime = new Date().getTime() / 1000;
      if (Number(nowTime) - Number(endTime) > 0) {
        clearInterval(Time1);
        $("#btn_signUp").attr("href", "./team");
        return;
      }
    }, 1000);
  },
};
