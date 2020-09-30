document.domain = "idvtwcampus.com"
var comm = {
    CheckHunter: function (type, _this) {
        var v = $(_this).val()
        if (!milo.isNumber(v)) {
            comm.alert("請正確填寫監管者人數")
            $(_this).focus()
            return
        }
        if (v > 1) {
            v = 1
            $(_this).val(v)
        }
        if (v < 0) {
            v = 0
            $(_this).val(v)
        }
        if (type == 1) {
            $('#NeedHunter').val(1 - v)
        } else {
            $('#OwnHunter').val(1 - v)
        }
    },
    CheckSurvivor: function (type, _this) {
        var v = $(_this).val()
        if (!milo.isNumber(v)) {
            comm.alert("請正確填寫監求生者人數")
            $(_this).focus()
            return
        }
        if (v > 4) {
            v = 4
            $(_this).val(v)
        }
        if (v < 0) {
            v = 0
            $(_this).val(v)
        }
        if (type == 1) {
            $('#NeedSurvivor').val(4 - v)
        } else {
            $('#OwnSurvivor').val(4 - v)
        }
    },
    CheckName: function (_this, str) {
        var v = $(_this).val()
        if (v.length < 2 || v.length > 40) {
            comm.alert(str ? str : "請正確填寫您的姓名")
            $(_this).focus()
            return false
        }
        return true
    },
    CheckPhone: function (_this, str) {
        var v = $(_this).val()
        if (v.length != 10 && v.length != 8 || !milo.isNumber(v)) {
            comm.alert(str ? str : "請正確填寫您的手機號碼")
            $(_this).focus()
            return false
        }
        return true
    },
    CheckBirthday: function (_this, str) {
        var v = $(_this).val()
        if (v == "") {
            comm.alert(str ? str : "請正確填寫您的出生日期")
            $(_this).focus()
            return false
        }
        if (milo.date("Y") - milo.date("Y", milo.strtotime(v)) < 15) {
            comm.alert("年齡小於15歲，無法參賽")
            $(_this).focus()
            return false
        }
        return true
    },
    CheckLineID: function (_this, str) {
        var v = $(_this).val()
        if (v == "") {
            comm.alert(str ? str : "請正確填寫您的LINE ID")
            $(_this).focus()
            return false
        }
        return true
    },
    CheckMail: function (_this) {
        var v = $(_this).val()
        if (!milo.isMail(v)) {
            comm.alert("請正確填寫您的電子信箱")
            $(_this).focus()
            return false
        }
        return true
    },
    CheckGameID: function (_this, str) {
        var v = $(_this).val()
        if (v == "") {
            comm.alert(str ? str : "請正確填寫您的Game_ID")
            $(_this).focus()
            return false
        }
        return true
    },
    CheckGameName: function (_this) {
        var v = $(_this).val()
        if (v == "") {
            comm.alert("請正確填寫您的Game_Name")
            $(_this).focus()
            return false
        }
        return true
    },
    CheckCode: function (_this) {
        var v = $(_this).val()
        if (v == "") {
            comm.alert("請正確填寫您的電子信箱認證碼")
            $(_this).focus()
            return false
        }
        return true
    },
    CheckTeam: function (_this) {
        var v = $(_this).val()
        if (v.length < 1 || v.length > 8) {
            comm.alert("請正確填寫您的隊伍名稱，長度不超過8個字符")
            $(_this).focus()
            return false
        }
        return true
    },
    CheckSchool: function (_this, str) {
        var v = $(_this).val()
        if (v == "") {
            comm.alert(str ? str : "請正確填寫隊長的學校全名")
            $(_this).focus()
            return false
        }
        return true
    },
    alert: function (str) {
        $('#notic_wrap .meg p').html(str)
        $('#notic_wrap').show()
    }
}