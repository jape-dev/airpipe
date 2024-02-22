import React, { useState } from "react";
import { ChannelType, ReportType } from "../vizoApi";

interface ReportTypeProps {
  channel: ChannelType;
  reportType: ReportType;
  setReportType: React.Dispatch<React.SetStateAction<ReportType | undefined>>;
}

export const ReportTypeModal: React.FC<ReportTypeProps> = ({
  channel,
  reportType,
  setReportType,
}) => {
  return (
    <>
      <button
        className="text-white bg-teal-500 hover:bg-teal-600 py-2 px-4 rounded transition duration-150 ease-in-out"
        onClick={() =>
          (
            document.getElementById("report-type-modal") as HTMLDialogElement
          ).showModal()
        }
      >
        Report Type: {reportType}
      </button>
      <dialog id="report-type-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {channel == ChannelType.INSTAGRAM_MEDIA ||
          channel == ChannelType.INSTAGRAM_ACCOUNT ? (
            <>
              <h3 className="font-bold text-lg">
                Instagram Report Type: {reportType}
              </h3>
              <p className="py-4">
                <strong>Media:</strong> Opt for this report type to receive data
                for each individual media post. This report will compile data
                from the most recent 1000 posts.
              </p>
              <p className="py-4">
                <strong>Account:</strong> Choose this report type for daily
                Account level data reporting. It will retrieve data from the
                past 30 days.
              </p>

              <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box mb -2">
                <li
                  className={
                    reportType == ReportType.MEDIA ? "bg-gray-300 rounded" : ""
                  }
                >
                  <a onClick={() => setReportType(ReportType.MEDIA)}>Media</a>
                </li>
                <li
                  className={
                    reportType == ReportType.MEDIA ? "" : "bg-gray-300 rounded"
                  }
                >
                  <a onClick={() => setReportType(ReportType.ACCOUNT)}>
                    Account
                  </a>
                </li>
              </ul>
            </>
          ) : channel == ChannelType.GOOGLE ? (
            <>
              <h3 className="font-bold text-lg">
                Google Report Type: {reportType}
              </h3>
              <p className="py-4">
                <strong>Media:</strong> Opt for this report type to receive data
                for ...
              </p>
              <p className="py-4">
                <strong>Video:</strong> Choose this report type for ...
              </p>

              <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box mb -2">
                <li
                  className={
                    reportType == ReportType.STANDARD
                      ? "bg-gray-300 rounded"
                      : ""
                  }
                >
                  <a onClick={() => setReportType(ReportType.STANDARD)}>
                    Standard
                  </a>
                </li>
                <li
                  className={
                    reportType == ReportType.STANDARD
                      ? ""
                      : "bg-gray-300 rounded"
                  }
                >
                  <a onClick={() => setReportType(ReportType.VIDEO)}>Video</a>
                </li>
              </ul>
            </>
          ) : null}
        </div>
      </dialog>
    </>
  );
};
