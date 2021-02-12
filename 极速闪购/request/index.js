let ajaxTimes = 0
export const request = (params) => {
    ajaxTimes++
    // 显示加载中效果
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxTimes--
                if (ajaxTimes === 0) {
                    // 关闭加载中效果
                    wx.hideLoading();
                }
            }
        });

    })
}