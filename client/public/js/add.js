
window.onbeforeunload = function(event) {
    return "您的內容未輸入完成. 確認離開此頁？";
};

$("#progressbar").sticky({topSpacing:$('#header').outerHeight()});

if (sessionStorage.getItem("jwt_account")==null){
    $('.back').hide();
}

$('input[name=socialadperm], input[name=socialpageperm]').change(function(){
    var val = $(this).parent().attr('data-value');
    var context = $(this).parent().parent();
    if (val=='yes'){
        $('input[type=number]', context).removeClass('d-none');
    } else {
        $('input[type=number]', context).addClass('d-none');
    }
});

var current_fs, next_fs, previous_fs; //fieldsets
var opacity;

$(".next").click(function () {
    $('.err-msg').remove();
    if ($(this).hasClass('step-1')){
        console.log('validating step 1')
        // Step 1 validation
        var validated = true;
        if ($('#campaign-categories label.active').length==0) {
            $('#campaign-categories').append('<div class="err-msg">請選擇至少一個分類</div>');
            validated = false;
        }
        if ($('#campaign-platform label.active').length==0) {
            $('#campaign-platform').append('<div class="err-msg">請選擇平台</div>');
            validated = false;
        }
        if ($('#campaign-gender label.active').length==0) {
            $('#campaign-gender').append('<div class="err-msg">請選擇至少一個網紅性別</div>');
            validated = false;
        }
        if ($('#campaign-budget input').val()==''){
            $('#campaign-budget').append('<div class="err-msg">請輸入預算</div>');
            validated = false;
        }
        if ($('#campaign-celebcount input').val()==''){
            $('#campaign-celebcount').append('<div class="err-msg">請輸入網紅人數</div>');
            validated = false;
        }

        if (validated == false){
            return;
        }

        // Write summary
        var strCate = "";
        $('#campaign-categories label.active').each(function(){
            var val = $(this).text().trim();
            strCate += "<li><span>"+ val +"</span></li>";
        });
        $('#campaignSummary .categories ul.value').html(strCate);
        
        var strPlatform = "";
        $('#campaign-platform label.active').each(function(){
            var val = $(this).text().trim();
            strPlatform += "<li><span>"+ val +"</span></li>";
            
        });
        $('#campaignSummary .platform ul.value').html(strPlatform);

        var strGender = "";
        $('#campaign-gender label.active').each(function(){
            var val = $(this).text().trim();
            strGender += "<li><span>"+ val +"</span></li>";
        });
        $('#campaignSummary .gender ul.value').html(strGender);

        $('#campaignSummary .budget span.value').text($('#campaign-budget input').val());
        $('#campaignSummary .celebcount span.value').text($('#campaign-celebcount input').val());

    }

    if ($(this).hasClass('step-2')){
        console.log('validating step 2')
        // Step 1 validation
        var validated = true;
        if ($('#campaign-brandname input').val()=='') {
            $('#campaign-brandname').append('<div class="err-msg">請輸入品牌名稱</div>');
            validated = false;
        }

        if (validated == false){
            return;
        }

        // Write summary
        $('#campaignSummary .brandname span.value').text($('#campaign-brandname input').val());

        var strProductLinks = "";
        $('#campaign-productlinks input').each(function(){
            var val = $(this).val().trim();
            if (val!==''){
                strProductLinks += "<li><span>"+ val +"</span></li>";
            }
        });
        $('#campaignSummary .productlinks ul.value').html(strProductLinks);
    }

    if ($(this).hasClass('step-3')){
        console.log('validating step 3')
        // Step 1 validation
        var validated = true;

        if ($('#campaign-format label.active').length==0) {
            $('#campaign-format').append('<div class="err-msg">請選擇合作規格</div>');
            validated = false;
        }

        var startDateVal = $('#campaign-startend .datestart input').val();
        var endDateVal = $('#campaign-startend .dateend input').val();

        if (startDateVal=='') {
            $('#campaign-startend').append('<div class="err-msg">請輸入預計檔期的開始日期</div>');
            validated = false;
        }

        if (endDateVal=='') {
            $('#campaign-startend').append('<div class="err-msg">請輸入預計檔期的結束日期</div>');
            validated = false;
        }

        if (parseInt(moment($('#campaign-startend .datestart input').datepicker('getDate')).format('YYYYMMDD')) > parseInt(moment($('#campaign-startend .dateend input').datepicker('getDate')).format('YYYYMMDD'))){
            $('#campaign-startend').append('<div class="err-msg">結束日期必須大於開始日期</div>');
            validated = false;
        }

        if ($('#campaign-desctopic textarea').val()=='') {
            $('#campaign-desctopic').append('<div class="err-msg">請輸入推廣主軸</div>');
            validated = false;
        }

        if ($('#campaign-descdirection textarea').val()=='') {
            $('#campaign-descdirection').append('<div class="err-msg">請輸入撰文方向</div>');
            validated = false;
        }

        if ($('#campaign-socialadperm label.active').attr('data-value')=='yes'){
            if ($('#campaign-socialadperm input[type=number]').val()==''){
                $('#campaign-socialadperm').append('<div class="err-msg">請輸入廣告主開放週數</div>');
                validated = false;
            }
        }

        if ($('#campaign-socialpageperm label.active').attr('data-value')=='yes'){
            if ($('#campaign-socialpageperm input[type=number]').val()==''){
                $('#campaign-socialpageperm').append('<div class="err-msg">請輸入廣告主開放週數</div>');
                validated = false;
            }
        }

        if (validated == false){
            return;
        }

        // Write summary
        var strFormat = "";
        $('#campaign-format label.active').each(function(){
            var val = $(this).text().trim();
            strFormat += "<li><span>"+ val +"</span></li>";
            
        });
        $('#campaignSummary .format ul.value').html(strFormat);

        var strStartEnd = "";
        var startDate = $('#campaign-startend .datestart input').datepicker('getDate');
        var endDate = $('#campaign-startend .dateend input').datepicker('getDate');
        strStartEnd += moment(startDate).format('YYYY/MM/DD') +" - ";
        strStartEnd += moment(endDate).format('YYYY/MM/DD');
        $('#campaignSummary .startend span.value').text(strStartEnd);

        $('#campaignSummary .desctopic div.value').text($('#campaign-desctopic textarea').val());

        $('#campaignSummary .socialperms').show();
        var strSocialPerms = "";
        $('#campaign-socialadperm label.active').each(function(){
            if ($(this).attr('data-value')=='yes'){
                var weeks = $('#campaign-socialadperm input[type=number]').val().trim();
                var txt = "需要廣告主開放 - "+ weeks +"週";
                strSocialPerms += "<li><span>"+ txt +"</span></li>";
            }
        });
        $('#campaign-socialpageperm label.active').each(function(){
            if ($(this).attr('data-value')=='yes'){
                var weeks = $('#campaign-socialpageperm input[type=number]').val().trim();
                var txt = "需要授權 - "+ weeks +"週";
                strSocialPerms += "<li><span>"+ txt +"</span></li>";
            }
        });
        if (strSocialPerms==""){
            $('#campaignSummary .socialperms').hide();
        }
        $('#campaignSummary .socialperms ul.value').html(strSocialPerms);

        window.campaignData = prepareData();
    }

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //Add Class Active
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    $('html,body').animate({ scrollTop: 0 }, 400);
    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function (now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
                'display': 'none',
                'position': 'relative'
            });
            next_fs.css({ 'opacity': opacity });
        },
        duration: 600
    });
});

$(".previous").click(function () {

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //Remove class active
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();

    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function (now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
                'display': 'none',
                'position': 'relative'
            });
            previous_fs.css({ 'opacity': opacity });
        },
        duration: 600
    });
});

$('.radio-group .radio').click(function () {
    $(this).parent().find('.radio').removeClass('selected');
    $(this).addClass('selected');
});

$(".submit").click(function () {
    return false;
});

$(function() {
    var $startDate = $('.datestart input');
    var $endDate = $('.dateend input');
    $startDate.datepicker({
        autoHide: true,
        format: 'yyyy/mm/dd',
        startDate: moment()
    });
    $endDate.datepicker({
        autoHide: true,
        format: 'yyyy/mm/dd',
        startDate: $startDate.datepicker('getDate'),
    });
    $startDate.on('pick.datepicker', function () {
        $endDate.datepicker('setStartDate', $startDate.datepicker('getDate'));
    });
});

function delay(callback, ms) {
    var timer = 0;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
        callback.apply(context, args);
        }, ms || 0);
    };
}

function productLinksAddNew(){
    if ($("#campaign-productlinks input").length >= 10){
        $(document).off("keyup", "#campaign-productlinks input");
        return;
    }
    $(document).off("keyup", "#campaign-productlinks input").on("keyup", "#campaign-productlinks input", delay(function(){
        var addNew = true;
        $('#campaign-productlinks input').each(function(i, v){
            if ($(v).val()==''){
                addNew = false;
            }
        });
        if (addNew){
            var newField = $('#campaign-productlinks input:last').parent().clone();
            $('#campaign-productlinks').append(newField);
            $('#campaign-productlinks input:last').val('');
            productLinksAddNew();
        }
    }, 500));
}
productLinksAddNew();

function prepareData(){
    console.log('prepping');
    var campaignData = {
        name: '',
        socialMedia: [],
        gender: [],
        budget: 0,
        celebCount: 0,
        brandName: '',
        postFormat: [],
        startTimeMs: 0,
        endTimeMs: 0,
        descTopic: '',
        socialAdPerm: 0,
        socialPagePerm: 0,
        categories: [],
        productLinks: [],
        confirm: 'n'
    };

    $('#campaign-categories .btn-group-toggle label.active').each(function(){
        campaignData.categories.push($(this).attr('data-value'));
    });

    $('#campaign-platform .btn-group-toggle label.active').each(function(){
        campaignData.socialMedia.push($(this).attr('data-value'));
    });
    
    $('#campaign-gender .btn-group-toggle label.active').each(function(){
        campaignData.gender.push($(this).attr('data-value'));
    });

    campaignData.budget = $('#campaign-budget input').val();
    campaignData.celebCount = $('#campaign-celebcount input').val();
    campaignData.brandName = $('#campaign-brandname input').val();

    $('#campaign-productlinks input').each(function(){
        var val = $(this).val().trim();
        if (val!==''){
            campaignData.productLinks.push(val);
        }
    });

    $('#campaign-format .btn-group-toggle label.active').each(function(){
        campaignData.postFormat.push($(this).attr('data-value'));
    });

    var startDate = $('#campaign-startend .datestart input').datepicker('getDate');
    var endDate = $('#campaign-startend .dateend input').datepicker('getDate');
    campaignData.startTimeMs = parseInt(moment(startDate).format('x'));
    campaignData.endTimeMs = parseInt(moment(endDate).format('x'));

    campaignData.descTopic = $('#campaign-desctopic textarea').val().trim();
    campaignData.name = campaignData.descTopic.substring(0, 18);

    $('#campaign-socialadperm .btn-group-toggle label.active').each(function(){
        var val = $(this).attr('data-value');
        if (val == 'yes'){
            campaignData.socialAdPerm = parseInt($('#campaign-socialadperm input[type=number]').val());
        }
    });

    $('#campaign-socialpageperm .btn-group-toggle label.active').each(function(){
        var val = $(this).attr('data-value');
        if (val == 'yes'){
            campaignData.socialPagePerm = parseInt($('#campaign-socialpageperm input[type=number]').val());
        }
    });
    return campaignData;
}

$(document).off("click starttap", "#submit").on("click starttap", "#submit", function(){
    if ($(this).hasClass('loading')){
        return;
    }
    if (!$('#tosAgree input').is(":checked")){
        $('#tosAgree .msg')
            .text('必需同意服務條款才能進行發送')
            .show();
        return;
    }
    $('#tosAgree .msg').hide();
    $(this).addClass('loading');
    if (window.campaignData.confirm=='y'){
        var jwtToken = sessionStorage.getItem("jwt_account");
        if (!jwtToken){
            $('#loginModal').modal('show');
            return;
        }
    }
    campaignSubmit()
    .then(function(newCampaign){
        if (newCampaign.status=='review'){
            window.location.href = "/campaign/dashboard";
        }
    })
    .catch(function(err){
        console.log('campaign submit error');
        console.log(err)
    })
});

function campaignSubmit(tmpToken=null){
    if (tmpToken!=null){
        token = tmpToken;
    } else {
        token = sessionStorage.getItem("jwt_account");
    }
    console.log('submitting campaign');
    return $.ajax({
        url: apiHost +"/campaign/info",
        type: "POST",
        headers: {
            "Authorization": token
        },
        data: JSON.stringify(window.campaignData),
        dataType: 'json',
        success:function (msg){
            if (msg.total!=undefined){
                $('#confirmModal h2 .value').text(msg.total);
                if (msg.total==0){
                    var $cloneCate = $('#campaign-categories').clone();
                    $cloneCate.removeAttr('id');
                    $cloneCate.attr('id', 'clone-categories');
                    $('#confirmModal .modal-body .modify').append($cloneCate);
                    $('.btn-group-toggle label', $cloneCate).click(function(){
                        $('#campaign-categories .btn-group-toggle label').eq($(this).index()).click();
                    });
                    
                    var $clonePlatform = $('#campaign-platform').clone();
                    $clonePlatform.removeAttr('id');
                    $clonePlatform.attr('id', 'clone-platform');
                    $('#confirmModal .modal-body .modify').append($clonePlatform);
                    $('.btn-group-toggle label', $clonePlatform).click(function(){
                        $('#campaign-platform .btn-group-toggle label').eq($(this).index()).click();
                    });

                    var $cloneGender = $('#campaign-gender').clone();
                    $cloneGender.removeAttr('id');
                    $cloneGender.attr('id', 'clone-gender');
                    $('#confirmModal .modal-body .modify').append($cloneGender);
                    $('.btn-group-toggle label', $cloneGender).click(function(){
                        $('#campaign-gender .btn-group-toggle label').eq($(this).index()).click();
                    });

                    var $cloneBudget = $('#campaign-budget').clone();
                    $cloneBudget.removeAttr('id');
                    $cloneBudget.attr('id', 'clone-budget');
                    $('#confirmModal .modal-body .modify').append($cloneBudget);
                    $('input', $cloneBudget).keyup(function(){
                        $('#campaign-budget input').val($(this).val());
                    });

                    var $cloneCelebCount = $('#campaign-celebcount').clone();
                    $cloneCelebCount.removeAttr('id');
                    $cloneCelebCount.attr('id', 'clone-celebcount');
                    $('#confirmModal .modal-body .modify').append($cloneCelebCount);
                    $('input', $cloneCelebCount).keyup(function(){
                        $('#campaign-celebcount input').val($(this).val());
                    });

                    $('#confirmSubmit').hide();
                } else {
                    $('#confirmModal .modify').hide();
                    $('#confirmPreview').hide();
                    $('#confirmSubmit').show();
                }
                
                $('#confirmModal').modal('show');
                return false;
            } else {
                window.onbeforeunload = function () {}
                return true;
            }
        },
        error:function(res){
            if (res.status==401){
                $('#loginModal').modal('show');
            } else {
                console.log('server error');
            }
        }
    });
}

$('#confirmPreview').click(function(){
    window.campaignData = prepareData();
    $('.next.step-1').click();
    $('#msform fieldset').hide();
    $('#msform fieldset.preview').show();
    $('#submit').removeClass('loading');
});

$('#confirmClose').click(function(){
    $('#submit').removeClass('loading');
});
$('#confirmSubmit').click(function(){
    $('#submit').removeClass('loading');
    window.campaignData.confirm = 'y';
    $('#submit').click();
});

function mockFill(){
    $('#campaign-categories .btn-group-toggle label:eq(0)').click();
    $('#campaign-categories .btn-group-toggle label:eq(2)').click();
    $('#campaign-categories .btn-group-toggle label:eq(4)').click();
    $('#campaign-categories .btn-group-toggle label:eq(6)').click();
    $('#campaign-categories .btn-group-toggle label:eq(7)').click();
    $('#campaign-platform .btn-group-toggle label:eq(1)').click();
    $('#campaign-platform .btn-group-toggle label:eq(2)').click();
    $('#campaign-gender .btn-group-toggle label:eq(0)').click();
    $('#campaign-gender .btn-group-toggle label:eq(1)').click();
    $('#campaign-budget input').val('22000');
    $('#campaign-celebcount input').val('3');
    $('.step-1').click();
    setTimeout(function(){
        $('#campaign-brandname input').val('我的品牌名稱');
        $('#campaign-productlinks input:eq(0)').val('https://facebook.com/');
        $('#campaign-productlinks input:eq(1)').val('https://www.youtube.com/');
        $('#campaign-productlinks input:eq(2)').val('https://www.instagram.com/');
        $('.step-2').click();
    },500);
    setTimeout(function(){
        $('#campaign-format .btn-group-toggle label:eq(0)').click();
        $('#campaign-format .btn-group-toggle label:eq(1)').click();
        $('#campaign-format .btn-group-toggle label:eq(2)').click();
        $('#campaign-startend .datestart input').val('2020/06/10');
        $('#campaign-startend .dateend input').val('2020/06/15');
        $('#campaign-desctopic textarea').val('希望找到在IG上粉絲數3萬以上的女性網紅(具備基本顏質)，參與一場直播導購寫真的專案活動，合作內容為每月至少開播30小時，相關報酬為可參與直播禮物收益40%，售出一本寫真分潤700元，貴司若作為協尋窗口可將報酬拆為抽取10%費用+寫真分潤200元，再麻煩您回覆我~感謝');
        // $('#campaign-descdirection textarea').val('希望找到在IG上粉絲數3萬以上的女性網紅(具備基本顏質)，參與一場直播導購寫真的專案活動，合作內容為每月至少開播30小時，相關報酬為可參與直播禮物收益40%，售出一本寫真分潤700元，貴司若作為協尋窗口可將報酬拆為抽取10%費用+寫真分潤200元，再麻煩您回覆我~感謝');
        $('#campaign-socialadperm .btn-group-toggle label:eq(1)').click();
        $('#campaign-socialadperm input[type=text]').val('6');
        $('#campaign-socialpageperm .btn-group-toggle label:eq(1)').click();
        $('#campaign-socialpageperm input[type=text]').val('3');
        $('.step-3').click();
        $('#agree-tos').click();
        $('#submit').click();
    },1000);
}
// mockFill();

